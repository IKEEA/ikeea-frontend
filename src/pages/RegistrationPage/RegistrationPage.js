import React, { useState, useEffect } from 'react';
import './RegistrationPage.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountBox from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import * as constants from '../../constants/RegistrationPage.constants.js';
import { useHistory, useParams } from 'react-router-dom';
import { getEmailFromToken } from '../../helpers/registrationHelpers';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default
    }
  },
  card: {
    marginTop: '30px',
    alignContent: 'center',
  },
  textField: {
    marginBottom: '10px'
  },
  avatar: {
    margin: 'auto',
    marginBottom: '20px',
    backgroundColor: theme.palette.primary.main
  },
  button: {
    margin: 'auto'
  }
}))

function RegistrationPage() {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState({ value: null, error: false, helperText: null });
  const [lastName, setLastName] = useState({ value: null, error: false, helperText: null });
  const [password, setPassword] = useState({ value: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ value: null, error: false, helperText: null });
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();

  const register = e => {
    // TO DO
    // implement field validation
    e.preventDefault();
    history.push("/");
  }

  return (
    <div>
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <Card className={classes.card}>
            <CardHeader>

            </CardHeader>
            <CardContent>
              <Avatar className={classes.avatar}>
                <AccountBox fontSize="large" />
              </Avatar>
              <TextField
                className={classes.textField}
                defaultValue={email}
                
                fullWidth
                autoFocus
                required
              />
              <TextField
                className={classes.textField}
                label="Enter your first name"
                fullWidth
                autoFocus
                required
                inputRef={input => firstName.value = input}
                error={firstName.error}
                helperText={firstName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Enter your last name"
                fullWidth
                required
                inputRef={input => lastName.value = input}
                error={lastName.error}
                helperText={lastName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Enter the password"
                fullWidth
                required
                inputRef={input => password.value = input}
                error={password.error}
                helperText={password.helperText}
                type="password"
              />
              <TextField
                className={classes.textField}
                label="Repeat the password"
                fullWidth
                required
                inputRef={input => repeatPassword.value = input}
                error={repeatPassword.error}
                helperText={repeatPassword.helperText}
                type="password"
              />
            </CardContent>
            <CardActions>
              <Button className={classes.button} type="submit" variant="contained" color="primary" onClick={(e) => register(e)} raised>Register</Button>
            </CardActions>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default RegistrationPage;
