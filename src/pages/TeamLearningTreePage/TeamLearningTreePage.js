import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { UserContext } from '../../context/UserContext';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Menu from '../../components/Menu/Menu';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import LearningTree from '../../components/LearningTree/LearningTree';

const TeamLearningTreePage = () => {
    const [user] = useContext(UserContext);
    const [setLoading] = useContext(LoadingContext);
    const [alert, setAlert] = useState({ open: false, message: null, severity: null });
    const [learningDays, setLearningDays] = useState([]);
    const chunkSize = 10;
    let learningDaysBuffer = [];

    const getLearningDays = (pageNumber) => {
        if (pageNumber === 0) {
            learningDaysBuffer = [];
        }
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${user.id}/list`, {page: pageNumber, size: chunkSize})
            .then(res => {
                if (res.data.length !== 0) {
                    learningDaysBuffer = [...learningDaysBuffer, ...res.data]
                    getLearningDays(++pageNumber);
                } else {
                    setLearningDays(learningDaysBuffer);
                    setLoading(false);
                    return;
                }
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }




    useEffect(() => {
        getLearningDays(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <Menu>
                <Typography variant="h5">
                    Team Learning Tree
                </Typography>
                <LearningTree learningDays={learningDays} />
            </Menu>
        </div>
    );
}

export default TeamLearningTreePage;