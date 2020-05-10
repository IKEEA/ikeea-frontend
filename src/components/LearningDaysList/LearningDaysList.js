import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LearningDayCard from './LearningDayCard/LearningDayCard';
import LearningDay from './LearningDay/LearningDay';
import axios from 'axios';

import { useStyles } from './LearningDaysList.styles';

const LearningDaysList = ({ setLoading, setAlert, topics, isTeamCalendar }) => {

    const emptyLearningDay = {
        date: new Date().toISOString(),
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
    const [learningDayNew, setLearningDayNew] = useState(false);
    const [selectedLearningDay, setSelectedLearningDay] = useState(emptyLearningDay);
    const classes = useStyles();

    useEffect(() => {
        getLearningDays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getLearningDays = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${user.id}/${isTeamCalendar ? 'list' : 'user-list'}`)
            .then(res => {
                setLearningDays(res.data);
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
                getLearningDays();
                setLearningDayModal(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }

    const updateLearningDay = (id, learningDay) => {
        setLoading(true);
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${id}/update`, learningDay)
            .then(res => {
                getLearningDays();
                setLearningDayEditable(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }

    const deleteLearningDay = (id) => {
        setLoading(true);
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${id}/delete`)
            .then(res => {
                getLearningDays();
                setLearningDayEditable(false);
                setLearningDayModal(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    }

    const handleNewLearningDayClick = (e) => {
        setSelectedLearningDay(emptyLearningDay);
        setLearningDayNew(true);
        setLearningDayEditable(true);
        setLearningDayModal(true);
    };

    const handleLearningDayClick = (e, learningDay) => {
        setSelectedLearningDay(learningDay);
        setLearningDayNew(false);
        setLearningDayEditable(false);
        setLearningDayModal(true);
    }

    return (
        <div>
            {learningDayModal ? <LearningDay setAlert={setAlert} setLearningDayModal={setLearningDayModal} learningDayModal={learningDayModal} learningDayNew={learningDayNew} learningDayEditable={learningDayEditable} setLearningDayEditable={setLearningDayEditable} deleteLearningDay={deleteLearningDay} updateLearningDay={updateLearningDay} createLearningDay={createLearningDay} allTopics={topics} learningDay={selectedLearningDay} isTeamCalendar={isTeamCalendar} /> : ''}
            <Grid container spacing={3} direction="row" justify="space-evenly">
                <Grid item xs={6}>
                    <Typography variant="h4">
                        Learning Days
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {
                        isTeamCalendar ? 
                        null : 
                        <span>
                            <Button variant="contained" color="primary" onClick={(e) => handleNewLearningDayClick(e)} style={{ float: 'right' }} disabled={user.restrictionDays === 0}>
                            Add New Learning Day
                            </Button>
                           { 
                                user.restrictionDays === 0 ?
                                <div className={classes.warning}>You have reached learning days limit this quarter</div> :
                                null
                           }
                        </span>
                    }
                </Grid>
                <Grid item xs={12}>
                    {
                        learningDays.sort((learningDay1, learningDay2) => new Date(learningDay1.date).getTime() > new Date(learningDay2.date).getTime() ? -1 : 1).map(learningDay =>
                            <LearningDayCard key={learningDay.id} learningDay={learningDay} handleLearningDayClick={handleLearningDayClick} />
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default LearningDaysList;
