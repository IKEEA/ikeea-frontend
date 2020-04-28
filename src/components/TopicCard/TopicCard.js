import React, { useState, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import axios from 'axios';

//components
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

//icons
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { useStyles } from './TopicCard.styles';

const TopicsPage = ({ topic, subtopics, getTopics, setAlert }) => {
  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editTopic, setEditTopic] = useState(JSON.parse(JSON.stringify(topic)));
  const [editSubtopics, setEditSubtopics] = useState([...subtopics]);
  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  const saveChanges = () => {
    setLoading(true);
    let promises = [];
    if(editSubtopics.length !== 0) {
         promises = editSubtopics.map(value => {
            return axios.put(`${process.env.REACT_APP_SERVER_URL}/api/topic/${value.id}/update`, value)
        });
    }
    promises.push(axios.put(`${process.env.REACT_APP_SERVER_URL}/api/topic/${editTopic.id}/update`, editTopic))
    Promise.all(promises).then(res => {
        getTopics();
        setEditMode(false);
        setAlert({ open: true, message: 'Topic updated successfully!', severity: 'success' });
    })
    .catch(err => {
        setLoading(false);
        setEditMode(false);
        setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    });
    
  }

  const changeTopicTitle = (e) => {
    editTopic.title = e.target.value;
    setEditTopic(editTopic);
  }

  const changeTopicDescription = (e) => {
    editTopic.description = e.target.value;
    setEditTopic(editTopic);
  }

  const changeSubtopicTitle = (e, id) => {
    editSubtopics.find(subtopic => subtopic.id === id).title = e.target.value;
    setEditSubtopics(editSubtopics);
  }

  const changeSubtopicDescription = (e, id) => {
    editSubtopics.find(subtopic => subtopic.id === id).description = e.target.value;
    setEditSubtopics(editSubtopics);
  }

  return (
    <div>
       { editMode ?
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)}/>}
            >
            <Typography className={classes.heading}>
                <TextField
                    className={classes.root}
                    defaultValue={topic.title}
                    onChange={(e) => changeTopicTitle(e)}
                />
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.content}>
                <b className={classes.title}>Description</b>
                <div className={classes.edit} onClick={() => saveChanges()}><SaveIcon/></div>
                <div>
                    <TextField
                        className={classes.root}
                        defaultValue={topic.description}
                        onChange={(e) => changeTopicDescription(e)}
                    />
                </div>
                <b className={classes.title}>Subtopics</b>
                {subtopics.length !== 0 ? subtopics.map((subtopic, index) => {
                    return (
                        <Card key={index} className={classes.subtopic}>
                            <b>Title</b>
                            <div>
                                <TextField
                                    className={classes.root}
                                    defaultValue={subtopic.title}
                                    onChange={(e) => changeSubtopicTitle(e, subtopic.id)}
                                />
                            </div>
                            <b>Description</b>
                            <div>
                                <TextField
                                    className={classes.root}
                                    defaultValue={subtopic.description}
                                    onChange={(e) => changeSubtopicDescription(e, subtopic.id)}
                                />
                            </div>
                        </Card>
                    )
                }) : <div>There are no subtopics created.</div>}
            </ExpansionPanelDetails>
        </ExpansionPanel> :
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)}/>}
            >
            <Typography className={classes.heading}>
                {topic.title}
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.content}>
                <b className={classes.title}>Description</b>
                <div className={classes.edit} onClick={() => setEditMode(true)}><EditIcon/></div>
                <div>{topic.description}</div>
                <b className={classes.title}>Subtopics</b>
                {subtopics.length !== 0 ? subtopics.map((subtopic, index) => {
                    return (
                        <Card key={index} className={classes.subtopic}>
                            <b>Title</b>
                            <div>{subtopic.title}</div>
                            <b>Description</b>
                            <div>{subtopic.description}</div>
                        </Card>
                    )
                }) : <div>There are no subtopics created.</div>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
        }
    </div>);
}

export default TopicsPage;
