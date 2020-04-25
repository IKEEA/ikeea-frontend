import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { LoadingContext } from '../../context/LoadingContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import LearningDaysList from '../../components/LearningDaysList/LearningDaysList';
import GoalsList from '../../components/GoalsList/GoalsList';

const MainPage = () => {
  const [user] = useContext(UserContext);
  const [setLoading] = useContext(LoadingContext);
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [learningDays, setLearningDays] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    getLearningDays();
    getGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getLearningDays() {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/learning-day/${user.id}/list`)
      .then(res => {
        setLearningDays(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        setLoading(false);
      });
  }

  function getGoals() {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/goal/${user.id}/list`)
      .then(res => {
        setGoals(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(err => {
        setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        setLoading(false);
      });
  }

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Menu>
        <Grid container spacing={3}>
          <Grid item xs={6}
            alignItems="flex-start">
            <LearningDaysList learningDays={learningDays} getLearningDays={getLearningDays} setLearningDays={setLearningDays} />
          </Grid>
          <Grid item xs={6}>
            <GoalsList goals={goals} getGoals={getGoals} setGoals={setGoals} />
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
}

export default MainPage;