import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './GoalCard.styles';

const GoalCard = ({ goal, updateGoal, isTeamCalendar }) => {
    const [status, setStatus] = useState(goal.status);
    const [statusSelect, setStatusSelect] = useState(false);
    const classes = useStyles();

    const handleStatusChange = (e) => {
        if (!isTeamCalendar) {
            const newStatus = e.target.value;
            setStatus(newStatus);
            goal.status = newStatus;
            updateGoal(goal);
        }
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Tooltip title={`${goal.firstName} ${goal.lastName}`} arrow>
                        <Avatar aria-label="learning-day" className={classes.avatar}>
                            {`${goal.firstName} ${goal.lastName}`.split(" ").map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join("")}
                        </Avatar>
                    </Tooltip>
                }
                title={
                    <Typography variant="h5">
                        {goal.topicTitle}
                    </Typography>}
                subheader={`Last Updated: ${new Date(goal.lastUpdated).toDateString()}`}
            />
            <CardContent>
                <FormControl className={classes.formControl}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={handleStatusChange}
                        readOnly={isTeamCalendar}
                        open={statusSelect}
                        onOpen={(e) => isTeamCalendar ? setStatusSelect(false) : setStatusSelect(true)}
                        onClose={(e) => setStatusSelect(false)}
                    >
                        <MenuItem key={1} value={'ASSIGNED'}>Assigned</MenuItem>
                        <MenuItem key={2} value={'IN_PROGRESS'}>In Progress</MenuItem>
                        <MenuItem key={3} value={'FINISHED'}>Finished</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}

export default GoalCard;
