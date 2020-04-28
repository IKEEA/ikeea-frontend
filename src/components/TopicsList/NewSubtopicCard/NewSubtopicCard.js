import React, { useState, useContext } from 'react';
import { LoadingContext } from '../../../context/LoadingContext';
import axios from 'axios';

//components
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//icons
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import { useStyles } from './NewSubtopicCard.styles';

const NewSubtopicCard = ({ topic, getTopics, setAlert }) => {
  const [addSubtopic, setAddSubtopic] = useState(false);
  const [newSubtopic, setNewSubtopic] = useState({
    title: '',
    description: '',
    parent: null
  });

  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  const changeNewSubtopicTitle = (e, parentId) => {
    newSubtopic.parent = parentId;
    newSubtopic.title = e.target.value;
    setNewSubtopic(newSubtopic);
  }

  const changeNewSubtopicDescription = (e, parentId) => {
    newSubtopic.parent = parentId;
    newSubtopic.description = e.target.value;
    setNewSubtopic(newSubtopic);
  }

  const createSubtopic = () => {
    setLoading(true);
    axios
       .post(`${process.env.REACT_APP_SERVER_URL}/api/topic/add`, newSubtopic)
       .then(res => {
            setAddSubtopic(false);
            getTopics();
            setAlert({ open: true, message: 'Topic added successfully!', severity: 'success' });
       })
       .catch(err => {
            setLoading(false);
            setAlert({ open: true, message: err.response.data.message, severity: 'error' });
       });
  }

  return (
    <div>
    {
        addSubtopic ?
        <Card className={classes.subtopic}>
                <div className={classes.edit} onClick={() => setAddSubtopic(false)}><CloseIcon/></div>
                <div className={classes.edit} onClick={() => createSubtopic()}><SaveIcon/></div>
                <b>Title</b>
                <div>
                    <TextField
                        className={classes.fullWidth}
                        onChange={(e) => changeNewSubtopicTitle(e, topic.id)}
                    />
                </div>
                <b>Description</b>
                <div>
                    <TextField
                        className={classes.fullWidth}
                        onChange={(e) => changeNewSubtopicDescription(e, topic.id)}
                    />
                </div>
            </Card> :
        <Button variant="contained" color="primary" onClick={() => setAddSubtopic(true)}>Add new subtopic</Button>
    }
    </div>);
}

export default NewSubtopicCard;
