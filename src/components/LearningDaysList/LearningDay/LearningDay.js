import React, { useContext, useState } from 'react';
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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import { useStyles } from './LearningDay.styles';

const LearningDay = ({ setLearningDayModal, learningDayEditable, setLearningDayEditable, allTopics }) => {
    const [user] = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [topics, setTopics] = useState([]);
    const classes = useStyles();

    const handleLearningDayClose = (e) => {
        setLearningDayEditable(false);
        setLearningDayModal(false);
    }

    return (
        <Dialog fullWidth="lg" maxWidth="lg" onClose={(e) => handleLearningDayClose(e)} className={classes.LearningDayModal} open={(e) => handleLearningDayClose(e)}>
            <DialogTitle>
                <TextField
                    className={classes.title}
                    required
                    placeholder="Title"
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
                                        onChange={(e) => setTopics(e.target.value)}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((topic) => (
                                                    <Chip color="primary" key={topic.id} label={topic.title} className={classes.topicChip} />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {allTopics.map((topic) => (
                                            <MenuItem key={topic.id} value={topic}>
                                                {topic.title}
                                            </MenuItem>
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
                <Button autoFocus onClick={console.log("To Do")} variant="contained" color="primary">
                    Create Learning Day
          </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LearningDay;
