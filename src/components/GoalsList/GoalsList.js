import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GoalCard from './GoalCard';

const GoalsList = ({ goals, getGoals, setGoals, setLoading }) => {
    const [user] = useContext(UserContext);

    const updateGoal = () => {
        console.log('To Do');
    };

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
