import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../../context/UserContext';

//components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '../../components/Menu/Menu';

import { useStyles } from './ProfilePage.styles';

export default function ProfilePage() {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState({ value: null, error: false, helperText: null });
  const [newPassword, setNewPassword] = useState({ value: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ value: null, error: false, helperText: null });

  const user = useContext(UserContext);

  console.log(user);


  useEffect(() => {
    //TODO
    // get user name and limit
  }, []);

  return (
    <div>
      <Menu>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                  User profile
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>{user.firstName} {user.lastName}</div>
                    <div>{user.email}</div>
                    <div>{user.roles[0]}</div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>Learning days limit this quarter</div>
                    <div>{user.learningDays}</div>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <div>MANAGER</div>
                    <div>{user.managerFirstName} {user.managerLastName}</div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              Change password
              <TextField
                label="Current password"
                fullWidth
                type="password"
                inputRef={input => oldPassword.value = input}
                error={oldPassword.error}
                helperText={oldPassword.helperText}
              />
              <TextField
                label="New password"
                fullWidth
                type="password"
                inputRef={input => newPassword.value = input}
                error={newPassword.error}
                helperText={newPassword.helperText}
              />
              <TextField
                label="Repeat new password"
                fullWidth
                type="password"
                inputRef={input => repeatPassword.value = input}
                error={repeatPassword.error}
                helperText={repeatPassword.helperText}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                raised="true"
                className={classes.submitButton}
              >
                Change
              </Button>
              </Paper>
            </Grid>
          </Grid>
        </Menu>
    </div>
  );
}
