import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/UserContext';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import { useStyles } from './LearningDay.styles';

const LearningDay = ({ setLearningDayModal, learningDayEditable, learningDayNew, createLearningDay, updateLearningDay, deleteLearningDay, setLearningDayEditable, allTopics, learningDay }) => {
    const [user] = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [topicsOpen, setTopicsOpen] = useState(false);
    const [subtopicsOpen, setSubtopicsOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setTitle(learningDay.title);
        setDate(new Date(learningDay.date));
        setTopics(learningDay.topics.filter(topic => !topic.parentId))
        setSubtopics(learningDay.topics.filter(topic => topic.parentId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLearningDayClose = (e) => {
        setLearningDayEditable(false);
        setLearningDayModal(false);
    };

    const handleTopicsChange = (e) => {
        if (learningDayEditable) {
            const newTopics = e.target.value;
            setTopics(newTopics);
            setSubtopics(subtopics.filter((subtopic) => {
                newTopics.some(topic => topic.id === subtopic.parentId)
            }))
        }
    };

    const handleSubtopicsChange = (e) => {
        if (learningDayEditable) {
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
        updateLearningDay(learningDay.id, {
            title: title,
            date: date.toISOString(),
            topicIds: [...topics, ...subtopics].map(topic => topic.id)
        })
    }

    const handleDeleteLearningDay = (e) => {
        deleteLearningDay(learningDay.id);
    }

    const validateInputs = () => {
        console.log('To Do');

    }

    return (
        <Dialog fullWidth="lg" maxWidth="lg" onClose={(e) => handleLearningDayClose(e)} open={(e) => handleLearningDayClose(e)} classes={{ paper: classes.LearningDayModal }}>
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
                    size="medium"
                />
                <IconButton aria-label="close" className={classes.closeButton} onClick={(e) => handleLearningDayClose(e)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1} direction="row">
                    <Grid item xs={9} id="contents">
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
                                        readOnly={learningDayEditable}
                                        value={date}
                                        onChange={(date) => setDate(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        readOnly={!learningDayEditable}
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
                                                    <Tooltip title={topic.description} arrow>
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
                                        onChange={(e) => handleSubtopicsChange(e.target.value)}
                                        open={subtopicsOpen}
                                        onOpen={(e) => learningDayEditable ? setSubtopicsOpen(true) : setSubtopicsOpen(false)}
                                        onClose={(e) => setSubtopicsOpen(false)}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((topic) => (
                                                    <Tooltip title={topic.description} arrow>
                                                        <Chip color="primary" key={topic.id} label={topic.title} className={classes.topicChip} />
                                                    </Tooltip>
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {topics.map((masterTopic) => (
                                            allTopics.map((topic) => (
                                                topic.parentId === masterTopic.id ?
                                                    <MenuItem key={topic.id} value={topic}>
                                                        <Chip color="primary" label={masterTopic.title} className={classes.topicChip} /> {topic.title}
                                                    </MenuItem> : ''
                                            ))
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} id="comments">

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {!learningDayNew && !learningDayEditable ?
                    <Button autoFocus variant="contained" color="primary" onClick={(e) => handleDeleteLearningDay(e)}>
                        Delete
                    </Button> : ''
                }
                {learningDayNew ?
                    <Button autoFocus variant="contained" color="primary" onClick={(e) => handleCreateLearningDay(e)}>
                        Create Learning Day
                    </Button> :
                    learningDayEditable ?
                        <Button autoFocus variant="contained" color="primary" onClick={(e) => handleSaveLearningDay(e)}>
                            Save
                        </Button> :
                        <Button autoFocus variant="contained" color="primary" onClick={(e) => setLearningDayEditable(true)}>
                            Edit
                        </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default LearningDay;
