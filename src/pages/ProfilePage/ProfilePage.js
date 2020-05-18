import React, { useState, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import { LoadingContext } from './../../context/LoadingContext';
import * as validator from '../../helpers/inputValidator';
import axios from 'axios';

//components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '../../components/Menu/Menu';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { useStyles } from './ProfilePage.styles';

export default function ProfilePage() {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState({ input: { value: '' }, error: false, helperText: null });
  const [newPassword, setNewPassword] = useState({ input: { value: '' }, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ input: { value: '' }, error: false, helperText: null });
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });

  const [user] = useContext(UserContext);
  const [setLoading] = useContext(LoadingContext);

  const changePassword = () => {
    setLoading(true);
    const errors = [];
    errors.push(validator.validateField(oldPassword.input, setOldPassword, validator.validatePassword));
    errors.push(validator.validateField(newPassword.input, setNewPassword, validator.validatePassword));
    errors.push(validator.validateField(repeatPassword.input, setRepeatPassword, validator.validatePassword));
    errors.push(validator.ensurePasswordMatching(newPassword.input, repeatPassword.input, setNewPassword, setRepeatPassword));
    if (!errors.find(error => error === true)) {
      axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}`, { password: newPassword.input.value, oldPassword: oldPassword.input.value })
        .then(res => {
          setLoading(false);
          clearFields();
          setAlert({ open: true, message: 'Password was changed successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' })
        });
    } else {
      setLoading(false);
    }
  }

  const clearFields = () => {
    oldPassword.input.value = '';
    newPassword.input.value = '';
    repeatPassword.input.value = '';
  }

  return (
    <div>
      <Menu>
        <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
            {alert.message}
          </Alert>
        </Snackbar>
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
                  <div>{user.restrictionDays} days</div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>MANAGER</div>
                  <div>{user.managerFirstName} {user.managerLastName}</div>
                  <div>{user.managerEmail}</div>
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
                inputRef={input => oldPassword.input = input}
                error={oldPassword.error}
                helperText={oldPassword.helperText}
              />
              <TextField
                label="New password"
                fullWidth
                type="password"
                inputRef={input => newPassword.input = input}
                error={newPassword.error}
                helperText={newPassword.helperText}
              />
              <TextField
                label="Repeat new password"
                fullWidth
                type="password"
                inputRef={input => repeatPassword.input = input}
                error={repeatPassword.error}
                helperText={repeatPassword.helperText}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                raised="true"
                className={classes.submitButton}
                onClick={() => changePassword()}
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
