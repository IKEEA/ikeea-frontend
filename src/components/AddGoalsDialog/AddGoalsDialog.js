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

const AddGoalsDialog = ({open, setOpen, user, getUsers, setAlert}) => {
  const [setLoading] = useContext(LoadingContext);
  const [goals, setGoals] = useState([]);
  const [topics, setTopics] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    getGoals(user.id);
    getTopics();
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
      console.log(err);
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
      console.log(err);
    });
  }

  const addGoal = () => {
    setLoading(true);
    axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}`)
        .then(res => {
          getUsers();
          setOpen(false);
          setLoading(false);
          setAlert({ open: true, message: 'Learning days limit updated successfully!', severity: 'success' });
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
                <Select>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
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
