import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from './GoalCard.styles';

const GoalCard = ({ goal }) => {
    const [user] = useContext(UserContext);
    const classes = useStyles();

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
                subheader={new Date(goal.lastUpdated).toDateString()}
            />
            <CardContent>
            </CardContent>
        </Card>
    );
}

export default GoalCard;
