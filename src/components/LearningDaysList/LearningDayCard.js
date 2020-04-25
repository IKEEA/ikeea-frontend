import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './LearningDayCard.styles';


const LearningDayCard = ({ learningDay }) => {
    const classes = useStyles();

    const onCardClick = (e) => {
        console.log('To Do: implement learning day page.');
    }

    return (
        <Card className={classes.root}>
            <ButtonBase className={classes.cardAction} onClick={e => onCardClick(e)}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="learning-day" className={classes.avatar}>
                            X
                        </Avatar>
                    }
                    title={
                        <Typography variant="h5">
                            {learningDay.title}
                        </Typography>}
                    subheader={new Date(learningDay.date).toDateString()}
                />
                <CardContent>
                    {learningDay.topics.map(topic =>
                        <Tooltip title={topic.description} arrow>
                            <Chip color="primary" className={classes.topicChip} key={topic.id} label={topic.title}></Chip>
                        </Tooltip>
                    )}
                </CardContent>
            </ButtonBase>
        </Card>
    );
}

export default LearningDayCard;
