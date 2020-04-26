import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LearningDayCard from './LearningDayCard/LearningDayCard';
import axios from 'axios';

const LearningDaysList = ({ setLoading, setAlert }) => {
    const [user] = useContext(UserContext);
    const [learningDays, setLearningDays] = useState([]);

    useEffect(() => {
        getLearningDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getLearningDays = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${user.id}/list`)
            .then(res => {
                setLearningDays(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }

    return (
        <Grid container spacing={3} direction="row">
            <Grid item xs={6}>
                <Typography variant="h4">
                    Learning Days
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary">Add New Learning Day</Button>
            </Grid>
            <Grid item xs={12}>
                {
                    learningDays.map(learningDay =>
                        <LearningDayCard key={learningDay.id} learningDay={learningDay} />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default LearningDaysList;
