import React, { useState } from 'react';
import * as validator from '../../helpers/inputValidator';

//components
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Logo from '../../components/Logo/Logo';

import { useStyles } from './LoginPage.styles';

const LoginPage = ({userLogin, loginError}) => {

  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const classes = useStyles();

  const login = () => {
    const errors = [];
    errors.push(validator.validateField(email.input, setEmail, validator.validateEmail));
    errors.push(validator.validateField(password.input, setPassword, validator.validatePassword));
    if (!errors.find(error => error === true)) {
      userLogin(email.input.value, password.input.value);
    }
  }

  return (
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <Logo/>
          <Card className={classes.card}>
            <CardContent>
              <TextField
                label="Email"
                fullWidth
                inputRef={input => email.input = input}
                error={email.error}
                helperText={email.helperText}
              />
              <TextField
                label="Password"
                fullWidth
                inputRef={input => password.input = input}
                error={password.error}
                helperText={password.helperText}
                type="password"
              />
            </CardContent>
            <CardActions className={classes.buttonContainer}>
              <Button type="submit" variant="contained" color="primary" onClick={() => login()} raised>Login</Button>
            </CardActions>
            <Alert className={classes.alert} severity="error" style={{ display: loginError ? 'flex' : 'none' }}>
              {loginError}
            </Alert>
          </Card>
        </Grid>
      </Container>
  );
}

export default LoginPage;
