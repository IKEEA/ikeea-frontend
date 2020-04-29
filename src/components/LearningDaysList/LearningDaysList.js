import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LearningDayCard from './LearningDayCard/LearningDayCard';
import LearningDay from './LearningDay/LearningDay';
import axios from 'axios';

const LearningDaysList = ({ setLoading, setAlert, topics }) => {

    const emptyLearningDay = {
        date: null,
        id: null,
        title: null,
        firstName: null,
        lastName: null,
        userId: null,
        topics: []
    }

    const [user] = useContext(UserContext);
    const [learningDays, setLearningDays] = useState([]);
    const [learningDayModal, setLearningDayModal] = useState(false);
    const [learningDayEditable, setLearningDayEditable] = useState(false);
    const [selectedLearningDay, setSelectedLearningDay] = useState(emptyLearningDay);

    useEffect(() => {
        getLearningDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getLearningDays = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${user.id}/user-list`)
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

    const createLearningDay = (learningDay) => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/add`, learningDay)
            .then(res => {
                console.log(res.data);
                getLearningDays();
                setLearningDayModal(false);
            })
            .catch(err => {
                console.log(err);
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }

    const handleNewLearningDayClick = (e) => {
        setSelectedLearningDay(emptyLearningDay);
        setLearningDayEditable(true);
        setLearningDayModal(true);
    };

    const handleLearningDayClick = (e, learningDay) => {
        setSelectedLearningDay(learningDay);
        setLearningDayEditable(false);
        setLearningDayModal(true);
    }

    return (
        <div>
            {learningDayModal ? <LearningDay setLearningDayModal={setLearningDayModal} learningDayEditable={learningDayEditable} setLearningDayEditable={setLearningDayEditable} createLearningDay={createLearningDay} allTopics={topics} learningDay={selectedLearningDay} /> : ''}
            <Grid container spacing={3} direction="row" justify="space-evenly">
                <Grid item xs={6}>
                    <Typography variant="h4">
                        Learning Days
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={(e) => handleNewLearningDayClick(e)} style={{ float: 'right' }}>Add New Learning Day</Button>
                </Grid>
                <Grid item xs={12}>
                    {
                        learningDays.map(learningDay =>
                            <LearningDayCard key={learningDay.id} learningDay={learningDay} handleLearningDayClick={handleLearningDayClick} />
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default LearningDaysList;
