import React from 'react';

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

  return (
    <div>
      <Menu>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>Name surname</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              Change password
              <TextField
                label="Current password"
                fullWidth
                required
              />
              <TextField
                label="New password"
                fullWidth
                required
              />
              <TextField
                label="Repeat new password"
                fullWidth
                required
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
                  label="Your limit"
                  fullWidth
                  type="number"
                  required
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
          </Grid>
        </Menu>
    </div>
  );
}
