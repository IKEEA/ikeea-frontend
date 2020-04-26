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
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './AllGoalsDialog.styles';

const AddGoalsDialog = ({open, setOpen, user, setAlert}) => {
  const [setLoading] = useContext(LoadingContext);
  const [goals, setGoals] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [dialogLoading, setDialogLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if(user.id){
        setDialogLoading(true);
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
      setDialogLoading(false);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      setDialogLoading(false);
    });
  }

  const getTopics = () => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/topic/list`)
    .then(res => {
        setTopics(res.data);
        setDialogLoading(false);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      setDialogLoading(false);
    });
  }

  const addGoal = () => {
    setLoading(true);
    setOpen(false);
    axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/goal/add`, {topicId: selectedTopic, userId: user.id })
        .then(res => {
          setLoading(false);
          setSelectedTopic(0);
          setGoals([]);
          setTopics([]);
          setAlert({ open: true, message: 'Goal added successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setSelectedTopic(0);
          setGoals([]);
          setTopics([]);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };

  let filteredTopics = topics.filter((topic) => {
    let has = 0;
    goals.filter((goal) => {
      if (topic.id === goal.topicId) {
        has = 1;
      }
    })
    if(has === 0) {
      return topic;
    }
  });

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        {
          dialogLoading ?
          <div className={classes.loadingContainer}><CircularProgress className={classes.loading}/></div> :
          <div>
            <DialogTitle>User Goals</DialogTitle>
            <DialogContent>
                {goals.length !== 0 ? goals.map(goal =>{
                    return <Chip key={goal.id} label={goal.topicTitle} className={classes.chip}/>
                }) : <div>User does not have any goals.</div>}
            </DialogContent>
            <DialogTitle>Add new goal</DialogTitle>
            <DialogContent>
                <FormControl className={classes.select}>
                    <InputLabel>Topics</InputLabel>
                    <Select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                      {filteredTopics.map(topic => {
                        return <MenuItem key={topic.id} value={topic.id}>{topic.title}</MenuItem>
                      })}
                    </Select>
                </FormControl>
            </DialogContent>
          </div>
        }
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
