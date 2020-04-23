import React, { useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LearningDaysList from '../../components/LearningDaysList/LearningDaysList';

const MainPage = () => {
  const [user] = useContext(UserContext);
  console.log(user);
  return (
    <Menu>
      <Grid container spacing={3}>
        <Grid item xs={6}
          alignItems="flex-start">
          <LearningDaysList />
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
    </Menu>
  );
}

export default MainPage;
