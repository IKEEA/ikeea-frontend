import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { useStyles } from './GoalCard.styles';

const GoalCard = ({ goal, updateGoal, deleteGoal }) => {
    const [user] = useContext(UserContext);
    const [status, setStatus] = useState(goal.status);
    const classes = useStyles();

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        goal.status = newStatus;
        updateGoal(goal);
    };

    const handleDeleteClick = (e) => {
        deleteGoal(goal);
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="learning-day" className={classes.avatar}>
                        {goal.userId}
                    </Avatar>
                }
                title={
                    <Typography variant="h5">
                        {goal.topicTitle}
                    </Typography>}
                subheader={`Last Updated: ${new Date(goal.lastUpdated).toDateString()}`}
                action={
                    <IconButton aria-label="delete" onClick={(e) => handleDeleteClick(e)}>
                        <DeleteOutlineIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <FormControl className={classes.formControl}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        native
                        value={status}
                        onChange={handleStatusChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value={'ASSIGNED'}>Assigned</option>
                        <option value={'IN_PROGRESS'}>In Progress</option>
                        <option value={'FINISHED'}>Finished</option>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default GoalCard;
