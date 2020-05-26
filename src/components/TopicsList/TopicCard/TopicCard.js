import React, { useState, useContext } from 'react';
import { LoadingContext } from '../../../context/LoadingContext';
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
import NewSubtopicCard from '../NewSubtopicCard/NewSubtopicCard';

const TopicCard = ({ topic, subtopics, getTopics, setAlert }) => {
  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editTopic, setEditTopic] = useState(JSON.parse(JSON.stringify(topic)));
  const [editSubtopics, setEditSubtopics] = useState(JSON.parse(JSON.stringify(subtopics)));
  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  const saveChanges = () => {
    setLoading(true);
    let promises = [];
    let error = false;
    if(editSubtopics.length !== 0) {
         promises = editSubtopics.map(value => {
            if(value.title.length < 3 || value.description.length < 3 || value.title.length > 100 || value.description.length > 255) error = true;
            return axios.put(`${process.env.REACT_APP_SERVER_URL}/api/topic/${value.id}`, value)
        });
    }
    if(editTopic.title.length < 3 || editTopic.description.length < 3 || editTopic.title.length > 100 || editTopic.description.length > 255) error = true;
    if(!error) {
        promises.push(axios.put(`${process.env.REACT_APP_SERVER_URL}/api/topic/${editTopic.id}`, editTopic))
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
    } else {
        setLoading(false);
        setAlert({ open: true, message: 'Field values can not be shorter that 3 or longer than 255 characters!', severity: 'error' })
    }
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

  const clickOnExpand = () => {
    setExpanded(!expanded);
    setEditMode(false);
  }
  
  return (
    <div>
       { editMode ?
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon onClick={() => clickOnExpand()} className={classes.accordionIcon}/>}
                className={classes.accordion}
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
                <div className={classes.edit} onClick={() => saveChanges()}><SaveIcon/></div>
                <b className={classes.title}>Description</b>
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
                <NewSubtopicCard topic={topic} getTopics={getTopics} setAlert={setAlert}/>
            </ExpansionPanelDetails>
        </ExpansionPanel> :
        <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon onClick={() => setExpanded(!expanded)} className={classes.accordionIcon}/>}
                className={classes.accordion}
            >
            <Typography className={classes.heading}>
                {topic.title}
            </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.content}>
                <div className={classes.edit} onClick={() => setEditMode(true)}><EditIcon/></div>
                <b className={classes.title}>Description</b>
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
                <NewSubtopicCard topic={topic} getTopics={getTopics} setAlert={setAlert}/>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        }
    </div>);
}

export default TopicCard;
