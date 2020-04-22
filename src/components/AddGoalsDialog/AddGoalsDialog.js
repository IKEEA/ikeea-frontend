import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from './AllGoalsDialog.styles';

const AddGoalsDialog = ({open, setOpen, user, setAlert}) => {
  const [setLoading] = useContext(LoadingContext);
  const [goals, setGoals] = useState([]);

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    if(user.id){
        getGoals(user.id);
        getTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  const getGoals = (userId) => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/goal/${userId}/list`)
    .then(res => {
      setGoals(res.data);
      console.log(res.data);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    });
  }

  const getTopics = () => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/topic/list`)
    .then(res => {
      setTopics(res.data);
      console.log(res.data);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    });
  }

  const addGoal = () => {
    setLoading(true);
    axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/goal/add`, {topicId: selectedTopic, userId: user.id })
        .then(res => {
          setOpen(false);
          setLoading(false);
          setAlert({ open: true, message: 'Goal added successfully!', severity: 'success' });
        })
        .catch(err => {
          setOpen(false);
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>User Goals</DialogTitle>
        <DialogContent>
            {goals.length !== 0 ? goals.map(goal =>{
                return <Chip label={goal.topicTitle}/>
            }) : <div>User do not have any goals.</div>}
        </DialogContent>
        <DialogTitle>Add new goal</DialogTitle>
        <DialogContent>
            <FormControl className={classes.select}>
                <InputLabel>Topics</InputLabel>
                <Select onChange={(e) => setSelectedTopic(e.target.value)}>
                    {topics.map(topic =>{
                        return <option value={topic.id}>{topic.title}</option>
                    }) }
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Cancel
        </Button>
            <Button onClick={() => addGoal()} color="primary">
                Add
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default AddGoalsDialog;
