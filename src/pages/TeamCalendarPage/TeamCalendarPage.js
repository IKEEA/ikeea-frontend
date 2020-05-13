import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { UserContext } from '../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import LearningDaysList from '../../components/LearningDaysList/LearningDaysList';
import GoalsList from '../../components/GoalsList/GoalsList';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useStyles } from './TeamCalendarPage.styles';


const TeamCalendarPage = () => {
  const [setLoading] = useContext(LoadingContext);
  const [user] = useContext(UserContext);
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
      date: null,
      topicId: 0,
      userId: 0 
  });

  const classes = useStyles();

  useEffect(() => {
    getTopics();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTopics = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/topic/list`)
      .then(res => {
        setTopics(res.data);
        setLoading(false);
      })
      .catch(err => {
        setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        setLoading(false);
      });
  };

  function getUsers() {
    setLoading(true);
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/manager/${user.id}/users`)
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      setLoading(false);
    });
  }

  function removeNullValues(obj) {
    for (let propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === 0) {
        delete obj[propName];
      }
    }
    return obj;
  }

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Menu>
        <Grid container spacing={4}>
        <Grid item lg={3}>
          <FormControl className={classes.dateSelect}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="dialog"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label='Date'
                    clearable
                    value={filters.date}
                    onChange={(value) => setFilters(Object.assign({}, filters, { date: value }))}
                  />
              </MuiPickersUtilsProvider>  
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl className={classes.select}>
            <InputLabel>Employee</InputLabel>
            <Select
              value={filters.userId}
              onChange={(e) => setFilters(Object.assign({}, filters, { userId: e.target.value }))}
            >
              <MenuItem value={0}>All employees</MenuItem>
             { 
              users.map(user => {
                return <MenuItem value={user.id}>{user.email}</MenuItem>
              })
             }
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={3}>
          <FormControl className={classes.select}>
            <InputLabel>Topic</InputLabel>
            <Select
              value={filters.topicId}
              onChange={(e) => setFilters(Object.assign({}, filters, { topicId: e.target.value }))}
            >
              <MenuItem value={0}>All topics</MenuItem>
              { 
              topics.map(topic => {
                return <MenuItem value={topic.id}>{topic.title}</MenuItem>
              })
             }
            </Select>
          </FormControl>
        </Grid>
          <Grid item lg={6}>
            <LearningDaysList setLoading={setLoading} setAlert={setAlert} topics={topics} isTeamCalendar={true} filters={removeNullValues(filters)}/>
          </Grid>
          <Grid item lg={6}>
            <GoalsList setLoading={setLoading} setAlert={setAlert} topics={topics} isTeamCalendar={true} filters={removeNullValues(filters)}/>
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
}

export default TeamCalendarPage;