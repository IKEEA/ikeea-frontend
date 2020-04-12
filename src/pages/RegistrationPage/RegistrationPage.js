import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { getEmailFromToken } from '../../helpers/registrationHelpers';
import * as validator from '../../helpers/inputValidator';
import { ErrorsContext } from '../../context/ErrorsContext';

//components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Logo from '../../components/Logo/Logo';

import { useStyles } from './RegistrationPage.styles';

const RegistrationPage = () => {
  const [email, setEmail] = useState({ input: {value: ''}, isLocked: false });
  const [firstName, setFirstName] = useState({ input: null, error: false, helperText: null });
  const [lastName, setLastName] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ input: null, error: false, helperText: null });
  const [redirect, setRedirect] = useState({ shouldRedirect: false, route: '' });
  const [errors, setErrors] = useContext(ErrorsContext);

  const params = useParams();
  const classes = useStyles();

  useEffect(() => {
    async function getEmail(token) {
      const response = await getEmailFromToken(token);
      if (response.errors) {
        setErrors({ errors: response.errors });
        setRedirect({ shouldRedirect: true, route: '/error' });
      }
      setEmail({ value: response.value, isLocked: true });
    }
    getEmail(params.token);
  }, [])

  const register = e => {
    const haveErrors = [];
    haveErrors.push(validator.validateField(firstName.input, setFirstName, validator.validateName));
    haveErrors.push(validator.validateField(lastName.input, setLastName, validator.validateName));
    haveErrors.push(validator.validateField(password.input, setPassword, validator.validatePassword));
    haveErrors.push(validator.validateField(repeatPassword.input, setRepeatPassword, validator.validatePassword));
    haveErrors.push(validator.ensurePasswordMatching(password.input, repeatPassword.input, setPassword, setRepeatPassword));
    e.preventDefault();
    console.log(haveErrors);
    if (!haveErrors.find(hasError => hasError === true)) {
      setRedirect({ shouldRedirect: true, route: '/' });
    }
  }

  return (
    <div>
      {redirect.shouldRedirect ? <Redirect to={redirect.route} /> : null}
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <Logo/>
          <Card className={classes.card}>
            <CardHeader>
            </CardHeader>
            <CardContent>
              <TextField
                value={email.value || ''}
                className={classes.textField}
                InputProps={{
                  readOnly: email.isLocked,
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
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default RegistrationPage;
