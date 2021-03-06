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


const LearningDayCard = ({ learningDay, handleLearningDayClick }) => {
    const classes = useStyles();

    const onCardClick = (e) => {
        handleLearningDayClick(e, learningDay);
    }

    return (
        <Card className={classes.root}>
            <ButtonBase className={classes.cardAction} onClick={e => onCardClick(e)}>
                <CardHeader
                    avatar={
                        <Tooltip title={`${learningDay.firstName} ${learningDay.lastName}`} arrow>
                            <Avatar aria-label="learning-day" className={classes.avatar}>
                                {`${learningDay.firstName} ${learningDay.lastName}`.split(" ").map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join("")}
                            </Avatar>
                        </Tooltip>
                    }
                    title={
                        <Typography variant="h5">
                            {learningDay.title}
                        </Typography>}
                    subheader={new Date(learningDay.date).toDateString()}
                />
                <CardContent>
                    {learningDay.topics.map(topic =>
                        <Tooltip key={topic.id} title={topic.description} arrow>
                            <Chip color="primary" className={classes.topicChip} key={topic.id} label={topic.title} variant={topic.parentId ? 'outlined' : 'default'}></Chip>
                        </Tooltip>
                    )}
                </CardContent>
            </ButtonBase>
        </Card>
    );
}

export default LearningDayCard;
