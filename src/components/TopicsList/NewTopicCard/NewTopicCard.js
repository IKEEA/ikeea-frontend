import React, { useState, useContext } from 'react';
import { LoadingContext } from '../../../context/LoadingContext';
import axios from 'axios';

//components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';

//icons
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import { useStyles } from './NewTopicCard.styles';

const NewTopicCard = ({setOpenNew, getTopics, setAlert}) => {
  const [topic, setTopic] = useState({
    title: '',
    description: '',
    parent: null
  });
  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  const addTopic = () => {
    setLoading(true);
    if(topic.title.length < 3 || topic.description.length < 3) {
        setLoading(false);
        setAlert({ open: true, message: 'Field values can not be shorter that 3 characters!', severity: 'error' })
    } else {
    axios
       .post(`${process.env.REACT_APP_SERVER_URL}/api/topic/add`, topic)
       .then(res => {
        setOpenNew(false);
            getTopics();
            setAlert({ open: true, message: 'Topic added successfully!', severity: 'success' });
       })
       .catch(err => {
            setLoading(false);
            setAlert({ open: true, message: err.response.data.message, severity: 'error' });
       });
    }
  }

  const changeTopicTitle = (e) => {
     topic.title = e.target.value;
     setTopic(topic);
  }

  const changeTopicDescription = (e) => {
     topic.description = e.target.value;
     setTopic(topic);
  }

  return (
    <ExpansionPanel expanded={true}>
        <ExpansionPanelSummary
            expandIcon={<CloseIcon onClick={() => setOpenNew(false)}/>}
        >
            <Typography className={classes.heading}>
                <TextField
                    label='Title'
                    className={classes.fullWidth}
                    onChange={(e) => changeTopicTitle(e)}
                />
            </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.content}>
            <div className={classes.edit} onClick={() => addTopic()}><SaveIcon/></div>
            <div>
                <TextField
                    label='Description'
                    className={classes.fullWidth}
                    onChange={(e) => changeTopicDescription(e)}
                />
            </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>
    );
}

export default NewTopicCard;
