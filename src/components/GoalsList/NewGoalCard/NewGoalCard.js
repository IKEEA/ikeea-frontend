import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './NewGoalCard.styles';

const NewGoalCard = ({ topics, addGoal, setNewGoalCard, topic, setTopic }) => {
    const classes = useStyles();

    const handleAddButtonClick = (e) => {
        setNewGoalCard(false);
        addGoal();
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={
                    <Typography variant="h5">
                        New Goal:
                    </Typography>}
                action={
                    <IconButton aria-label="delete" onClick={(e) => setNewGoalCard(false)}>
                        <CloseIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <Grid container spacing={3} direction="row" justify="space-between"
                    alignItems="flex-end">
                    <Grid item xs={6}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Topic</InputLabel>
                            <Select
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            >
                                {topics.map(topic => <MenuItem key={topic.id} value={topic.id}>{topic.title}</MenuItem>)}
                            </Select>
                            <Link to='/manageTopics'>Manage topics</Link>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary" className={classes.addButton} onClick={(e) => handleAddButtonClick(e)}>ADD</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default NewGoalCard;
