import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountBox from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { getEmailFromToken } from '../../helpers/registrationHelpers';
import * as inputValidationHelpers from '../../helpers/inputValidationHelpers';
import * as loginHelpers from '../../helpers/loginHelpers';
import { ErrorsContext } from '../../context/ErrorsContext';


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

function LoginPage() {

  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const [redirect, setRedirect] = useState({ shouldRedirect: false, route: '' });
  const [errors, setErrors] = useContext(ErrorsContext);
  const classes = useStyles();

  const login = async (e) => {
    const haveErrors = [];
    haveErrors.push(inputValidationHelpers.validateField(email.input, setEmail, inputValidationHelpers.validateEmail));
    haveErrors.push(inputValidationHelpers.validateField(password.input, setPassword, inputValidationHelpers.validatePassword));
    e.preventDefault();
    if (!haveErrors.find(hasError => hasError = true)) {
      const response = await loginHelpers.login(email.input.value, password.input.value);
      setRedirect({ shouldRedirect: true, route: '/' });
    }

  }

  return (
    <div>
      {redirect.shouldRedirect ? <Redirect to={redirect.route} /> : null}
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
          </Card>
        </Grid>
      </Container>
    </div>
  );
}

export default LoginPage;
