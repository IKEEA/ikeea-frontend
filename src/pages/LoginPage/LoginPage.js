import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AccountBox from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import * as inputValidationHelpers from '../../helpers/inputValidationHelpers';
import * as loginHelpers from '../../helpers/loginHelpers';
import { Alert } from '@material-ui/lab';
import { UserContext } from '../../context/UserContext';
import Logo from '../../components/Logo';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default
    }
  },
  card: {
    marginTop: '15px',
    alignContent: 'center',
  },
  textField: {
    marginBottom: '10px'
  },
  button: {
    margin: 'auto'
  },
  alert: {
    margin: '10px'
  }
}))

function LoginPage() {

  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const [redirect, setRedirect] = useState({ shouldRedirect: false, route: '' });
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(UserContext);

  const classes = useStyles();

  const login = async (e) => {
    setLoginError('');
    const haveErrors = [];
    haveErrors.push(inputValidationHelpers.validateField(email.input, setEmail, inputValidationHelpers.validateEmail));
    haveErrors.push(inputValidationHelpers.validateField(password.input, setPassword, inputValidationHelpers.validatePassword));
    e.preventDefault();
    if (!haveErrors.find(hasError => hasError === true)) {
      const response = await loginHelpers.login(email.input.value, password.input.value);
      if (response.error) {
        setLoginError(`${response.error}: ${response.message}`)
      } else if (response.accessToken) {
        setUser({ accessToken: response.accessToken });
        setRedirect({ shouldRedirect: true, route: '/' });
      } else {
        setLoginError('Something went terribly wrong');
      }
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
                className={classes.textField}
                label="Enter your first name"
                fullWidth
                autoFocus
                inputRef={input => email.input = input}
                error={email.error}
                helperText={email.helperText}
              />
              <TextField
                className={classes.textField}
                label="Enter the password"
                fullWidth
                inputRef={input => password.input = input}
                error={password.error}
                helperText={password.helperText}
                type="password"
              />
            </CardContent>
            <CardActions>
              <Button className={classes.button} type="submit" variant="contained" color="primary" onClick={(e) => login(e)} raised>Login</Button>
            </CardActions>
            <Alert className={classes.alert} severity="error" style={{ display: loginError ? 'flex' : 'none' }}>
              {loginError}
            </Alert>
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default LoginPage;
