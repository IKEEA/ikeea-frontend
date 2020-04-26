import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoalCard from './GoalCard/GoalCard';
import NewGoalCard from './NewGoalCard/NewGoalCard';
import axios from 'axios';

const GoalsList = ({ setLoading, setAlert, topics }) => {
    const [user] = useContext(UserContext);
    const [goals, setGoals] = useState([]);
    const [newGoalCard, setNewGoalCard] = useState(false);
    const [topic, setTopic] = useState();

    useEffect(() => {
        getGoals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateGoal = (goal) => {
        setLoading(true);
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/goal/${goal.id}/update`, {
                status: goal.status,
                topicId: goal.topicId,
                userId: goal.userId
            })
            .then(res => {
                console.log(res.data);
                getGoals();
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    };

    const deleteGoal = (goal) => {
        setLoading(true);
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/goal/${goal.id}/delete`)
            .then(res => {
                console.log(res.data);
                getGoals();
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    };

    const getGoals = () => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/goal/${user.id}/list`)
            .then(res => {
                setGoals(res.data);
                console.log(res.data);
                setLoading(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setLoading(false);
            });
    };

    const addGoal = (goal) => {
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/goal/add`, { topicId: topic, userId: user.id })
            .then(res => {
                getGoals();
                setAlert({ open: true, message: 'Goal added successfully!', severity: 'success' });
            })
            .catch(err => {
                setLoading(false);
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
            });
    };

    return (
        <Grid container spacing={3} direction="row">
            <Grid item xs={6}>
                <Typography variant="h4">
                    Goals
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={(e) => setNewGoalCard(true)}>Add New Goal</Button>
            </Grid>
            <Grid item xs={12}>
                {newGoalCard ? <NewGoalCard topics={topics} setNewGoalCard={setNewGoalCard} addGoal={addGoal} topic={topic} setTopic={setTopic} /> : ''}
                {
                    goals.map(goal =>
                        <GoalCard goal={goal} updateGoal={updateGoal} deleteGoal={deleteGoal} />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default GoalsList;
