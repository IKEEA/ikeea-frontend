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
            <LearningDaysList setLoading={setLoading} setAlert={setAlert} />
          </Grid>
          <Grid item xs={6}>
            <GoalsList setLoading={setLoading} setAlert={setAlert} />
          </Grid>
        </Grid>
      </Menu>
    </div>
  );
}

export default MainPage;