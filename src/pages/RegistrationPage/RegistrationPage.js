import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import * as validator from '../../helpers/inputValidator';
import { ErrorsContext } from '../../context/ErrorsContext';
import axios from 'axios';

//components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Logo from '../../components/Logo/Logo';
import { Alert } from '@material-ui/lab';

import { useStyles } from './RegistrationPage.styles';

const RegistrationPage = () => {
  const [email, setEmail] = useState({ value: '' });
  const [firstName, setFirstName] = useState({ input: null, error: false, helperText: null });
  const [lastName, setLastName] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ input: null, error: false, helperText: null });
  const [redirect, setRedirect] = useState({ shouldRedirect: false, route: '' });
  const [registrationError, setRegistrationError] = useState('');
  const [setErrors] = useContext(ErrorsContext);

  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    verifyToken(params.token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyToken = token => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/verify/${token}`)
      .then(res => {
        setEmail({ value: res.data.message });
      })
      .catch(err => {
        err.response.data.message ? setErrors({ errors: [err.response.data.message] }) : setErrors({ errors: ['Unknown error'] });
        setRedirect({ shouldRedirect: true, route: '/error' });
      });
  }

  const register = e => {
    const haveErrors = [];
    haveErrors.push(validator.validateField(firstName.input, setFirstName, validator.validateRequiredField));
    haveErrors.push(validator.validateField(lastName.input, setLastName, validator.validateRequiredField));
    haveErrors.push(validator.validateField(password.input, setPassword, validator.validatePassword));
    haveErrors.push(validator.validateField(repeatPassword.input, setRepeatPassword, validator.validatePassword));
    haveErrors.push(validator.ensurePasswordMatching(password.input, repeatPassword.input, setPassword, setRepeatPassword));
    e.preventDefault();
    console.log(haveErrors);
    if (!haveErrors.find(hasError => hasError === true)) {
      setRegistrationError('');
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
          firstName: firstName.input.value,
          lastName: lastName.input.value,
          email: email.value,
          password: password.input.value
        })
        .then(res => {
          setRedirect({ shouldRedirect: true, route: '/login' });
        })
        .catch(err => {
          err.response ?
            setRegistrationError(`${err.response.data.error}: ${err.response.data.message}`) :
            setRegistrationError('System error, please try again later.');
        });
    }
  }

  return (
    <div>
      {redirect.shouldRedirect ? <Redirect to={redirect.route} /> : null}
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <Logo />
          <Card className={classes.card}>
            <CardHeader>
            </CardHeader>
            <CardContent>
              <TextField
                value={email.value || ''}
                className={classes.textField}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
              />
              <TextField
                className={classes.textField}
                label="First name"
                fullWidth
                autoFocus
                required
                inputRef={input => firstName.input = input}
                error={firstName.error}
                helperText={firstName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Last name"
                fullWidth
                required
                inputRef={input => lastName.input = input}
                error={lastName.error}
                helperText={lastName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Password"
                fullWidth
                required
                inputRef={input => password.input = input}
                error={password.error}
                helperText={password.helperText}
                type="password"
              />
              <TextField
                className={classes.textField}
                label="Repeat password"
                fullWidth
                required
                inputRef={input => repeatPassword.input = input}
                error={repeatPassword.error}
                helperText={repeatPassword.helperText}
                type="password"
              />
            </CardContent>
            <CardActions>
              <Button className={classes.button} type="submit" variant="contained" color="primary" onClick={(e) => register(e)} raised="true">Register</Button>
            </CardActions>
            <Alert className={classes.alert} severity="error" style={{ display: registrationError ? 'flex' : 'none' }}>
              {registrationError}
            </Alert>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default RegistrationPage;
