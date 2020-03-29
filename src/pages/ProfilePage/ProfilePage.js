import React, { useState, useEffect } from 'react';

//components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '../../components/Menu/Menu';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const [userName, setUserName] = useState('Test Name Surname');
  const [oldPassword, setOldPassword] = useState({ value: null, error: false, helperText: null });
  const [newPassword, setNewPassword] = useState({ value: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ value: null, error: false, helperText: null });
  const [daysLimit, setDaysLimit] = useState(3);

  useEffect(() => {
    //TODO
    // get user name and limit
  }, []);

  return (
    <div>
      <Menu>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{userName}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              Change password
              <TextField
                label="Current password"
                fullWidth
                required
                autoFocus
                type="password"
                inputRef={input => oldPassword.value = input}
                error={oldPassword.error}
                helperText={oldPassword.helperText}
              />
              <TextField
                label="New password"
                fullWidth
                required
                autoFocus
                type="password"
                inputRef={input => newPassword.value = input}
                error={newPassword.error}
                helperText={newPassword.helperText}
              />
              <TextField
                label="Repeat new password"
                fullWidth
                required
                autoFocus
                type="password"
                inputRef={input => repeatPassword.value = input}
                error={repeatPassword.error}
                helperText={repeatPassword.helperText}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                raised
                className={classes.submitButton}
              >
                Change
              </Button>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                Your monthly learning days limit
                <TextField
                  fullWidth
                  defaultValue={daysLimit}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Menu>
    </div>
  );
}
