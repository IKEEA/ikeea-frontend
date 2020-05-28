import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Comments from '../LearningDay/Comments/Comments';

import * as constants from '../../../constants/learningDay.constants';

import { useStyles } from './LearningDay.styles';

const LearningDay = ({ setAlert, setLearningDayModal, learningDayModal, learningDayEditable, learningDayNew, createLearningDay, updateLearningDay, deleteLearningDay, setLearningDayEditable, allTopics, learningDay, isTeamCalendar }) => {
    const today = new Date();

    const [user] = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(today);
    const [initialDate, setInitialDate] = useState(today);
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [topicsOpen, setTopicsOpen] = useState(false);
    const [subtopicsOpen, setSubtopicsOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const classes = useStyles();

    
    
    useEffect(() => {
        const learningDayTopics = learningDay.topics.filter(topic => !topic.parentId);
        const learningDaySubtopics = learningDay.topics.filter(topic => topic.parentId);
        setTitle(learningDay.title);
        setDate(new Date(learningDay.date));
        setInitialDate(new Date(learningDay.date));
        setTopics(allTopics.filter(topic => learningDayTopics.some(t => t.id === topic.id)))
        setSubtopics(allTopics.filter(topic => learningDaySubtopics.some(t => t.id === topic.id)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLearningDayClose = (e) => {
        setLearningDayEditable(false);
        setLearningDayModal(false);
    };

    const handleTopicsChange = (e) => {
        if (learningDayEditable) {
            if (e.target.value.length > constants.MAX_TOPICS_PER_LEARNING_DAY) {
                setAlert({ open: true, message: constants.MAX_TOPICS_PER_LEARNING_DAY_EXCEEDED_ERROR, severity: 'error' });
                return;
            }
            setTopics(e.target.value.filter((topic, index, self) => index === self.findIndex(t => t.id === topic.id)));
        }
    };

    const handleSubtopicsChange = (e) => {
        if (learningDayEditable) {
            if (e.target.value.length > constants.MAX_TOPICS_PER_LEARNING_DAY) {
                setAlert({ open: true, message: constants.MAX_TOPICS_PER_LEARNING_DAY_EXCEEDED_ERROR, severity: 'error' });
                return;
            }
            setSubtopics(e.target.value);
        }
    }

    const handleCreateLearningDay = (e) => {
        createLearningDay({
            title: title,
            date: date.toISOString(),
            topicIds: [...topics, ...subtopics].map(topic => topic.id),
            userId: user.id
        })
    }

    const handleSaveLearningDay = (e) => {
        setInitialDate(date);
        updateLearningDay(learningDay.id, {
            title: title,
            date: date.toISOString(),
            topicIds: [...topics, ...subtopics].map(topic => topic.id)
        })
    }

    const handleDeleteLearningDay = (e) => {
        setDeleteDialog(false);
        deleteLearningDay(learningDay.id);
    }

    const addComment = (comment) => {
        setCommentsLoading(true);
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/comment/add`, {
                comment: comment,
                learningDayId: learningDay.id,
                userId: user.id
            })
            .then(res => {
                getComments();
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setCommentsLoading(false);
            });
    }

    const deleteComment = (commentId) => {
        setCommentsLoading(true);
        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/comment/${commentId}`)
            .then(res => {
                getComments();
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setCommentsLoading(false);
            });
    }

    const getComments = () => {
        setCommentsLoading(true);
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/comment/${learningDay.id}/list`)
            .then(res => {
                setComments(res.data);
                setCommentsLoading(false);
            })
            .catch(err => {
                setAlert({ open: true, message: err.response.data.message, severity: 'error' });
                setCommentsLoading(false);
            });
    }

    const disableDates = (d) => {
        const isAllowed = ((d.setHours(12,0,0,0) >= today.setHours(12,0,0,0)) || (d.setHours(12,0,0,0) == initialDate.setHours(12,0,0,0)));
        return !isAllowed;
    }

    return (
        <div>
            <Dialog fullWidth maxWidth="lg" onClose={(e) => handleLearningDayClose(e)} open={learningDayModal} classes={{ paper: classes.LearningDayModal }}>
                <DialogTitle className={classes.dialogTitle}>
                    <TextField
                        className={classes.title}
                        required
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        InputProps={{
                            readOnly: !learningDayEditable,
                            classes: { input: classes.title }
                        }}
                        inputProps={{
                            maxLength: 100
                        }}
                        size="medium"
                    />
                    <IconButton aria-label="close" className={classes.closeButton} onClick={(e) => handleLearningDayClose(e)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} direction="row" className={classes.container}>
                        <Grid item xs={8} id="contents">
                            <Grid container spacing={10} direction="column" justify="space-around">
                                <Grid item xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            disableToolbar
                                            variant="inline"
                                            format="yyyy-MM-dd"
                                            margin="normal"
                                            label="Date"
                                            error={false}
                                            helperText={null}
                                            shouldDisableDate={disableDates}
                                            readOnly={!learningDayEditable}
                                            value={date}
                                            onChange={(date) => setDate(date)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">Topics</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={topics}
                                            onChange={(e) => handleTopicsChange(e)}
                                            open={topicsOpen}
                                            onOpen={(e) => learningDayEditable ? setTopicsOpen(true) : setTopicsOpen(false)}
                                            onClose={(e) => setTopicsOpen(false)}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((topic) => (
                                                        <Tooltip key={topic.id} title={topic.description} arrow>
                                                            <Chip color="primary" key={topic.id} label={topic.title} className={classes.topicChip} />
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {allTopics.map((topic) => (
                                                !topic.parentId ?
                                                    <MenuItem key={topic.id} value={topic}>
                                                        {topic.title}
                                                    </MenuItem> : ''
                                            ))}
                                        </Select>
                                        {learningDayEditable ? <Link to='/manageTopics'>Manage topics</Link> : null}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-mutiple-chip-label">Subtopics</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            value={subtopics}
                                            onChange={(e) => handleSubtopicsChange(e)}
                                            open={subtopicsOpen}
                                            onOpen={(e) => learningDayEditable ? setSubtopicsOpen(true) : setSubtopicsOpen(false)}
                                            onClose={(e) => setSubtopicsOpen(false)}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                    {selected.map((topic) => (
                                                        <Tooltip key={topic.id} title={topic.description} arrow>
                                                            <Chip color="primary" key={topic.id} label={topic.title} className={classes.topicChip} variant={"outlined"}/>
                                                        </Tooltip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {allTopics.filter(topic => !topic.parentId).map((masterTopic) => (
                                                allTopics.map((topic) => (
                                                    topic.parentId === masterTopic.id ?
                                                        <MenuItem key={topic.id} value={topic}>
                                                            <Chip color="primary" label={masterTopic.title} className={classes.topicChip} /> {topic.title}
                                                        </MenuItem> : ''
                                                ))
                                            ))}
                                        </Select>
                                        {learningDayEditable ? <Link to='/manageTopics'>Manage subtopics</Link> : null}
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4} id="comments">
                            {learningDayNew ? '' : <Comments commentsLoading={commentsLoading} setCommentsLoading={setCommentsLoading} addComment={addComment} deleteComment={deleteComment} getComments={getComments} comments={comments} />}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {!learningDayNew && !learningDayEditable ?
                        <Button autoFocus variant="contained" color="primary" onClick={(e) => setDeleteDialog(true)}>
                            Delete
                    </Button> : ''
                    }
                    {learningDayNew ?
                    <Button disabled={!title || !(topics.length || subtopics.length || !date)} autoFocus variant="contained" color="primary" onClick={(e) => handleCreateLearningDay(e)}>
                            Create Learning Day
                    </Button> :
                        learningDayEditable ?
                            <Button disabled={!title || !(topics.length || subtopics.length || !date || isTeamCalendar)} autoFocus variant="contained" color="primary" onClick={(e) => handleSaveLearningDay(e)}>
                                Save
                        </Button> :
                            <Button autoFocus variant="contained" color="primary" onClick={(e) => setLearningDayEditable(true)} disabled={isTeamCalendar}>
                                Edit
                        </Button>
                    }
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteDialog}
                onClose={(e) => setDeleteDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Learning Day?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => handleDeleteLearningDay(e)} color="primary">
                        Yes
                </Button>
                    <Button onClick={(e) => setDeleteDialog(false)} color="primary" autoFocus>
                        No
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LearningDay;
