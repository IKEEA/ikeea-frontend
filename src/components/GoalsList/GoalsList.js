import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoalCard from './GoalCard';
import axios from 'axios';

const GoalsList = ({ setLoading, setAlert }) => {
    const [user] = useContext(UserContext);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        getGoals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateGoal = () => {
        console.log('To Do');
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
    }

    return (
        <Grid container spacing={3} direction="row">
            <Grid item xs={6}>
                <Typography variant="h4">
                    Goals
                    </Typography>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary">Add New Goal</Button>
            </Grid>
            <Grid item xs={12}>
                {
                    goals.map(goal =>
                        <GoalCard goal={goal} updateGoal={updateGoal} />
                    )
                }
            </Grid>
        </Grid>
    );
}

export default GoalsList;
