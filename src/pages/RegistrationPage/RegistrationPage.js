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
import * as inputValidationHelpers from '../../helpers/inputValidator';
import { ErrorsContext } from '../../context/ErrorsContext';
import Logo from '../../components/Logo/Logo';


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

  const [email, setEmail] = useState({ input: {value: ''}, isLocked: false });
  const [firstName, setFirstName] = useState({ input: null, error: false, helperText: null });
  const [lastName, setLastName] = useState({ input: null, error: false, helperText: null });
  const [password, setPassword] = useState({ input: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ input: null, error: false, helperText: null });
  const [redirect, setRedirect] = useState({ shouldRedirect: false, route: '' });
  const [errors, setErrors] = useContext(ErrorsContext);
  const params = useParams();
  const history = useHistory();
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
    haveErrors.push(inputValidationHelpers.validateField(firstName.input, setFirstName, inputValidationHelpers.validateName));
    haveErrors.push(inputValidationHelpers.validateField(lastName.input, setLastName, inputValidationHelpers.validateName));
    haveErrors.push(inputValidationHelpers.validateField(password.input, setPassword, inputValidationHelpers.validatePassword));
    haveErrors.push(inputValidationHelpers.validateField(repeatPassword.input, setRepeatPassword, inputValidationHelpers.validatePassword));
    haveErrors.push(inputValidationHelpers.ensurePasswordMatching(password.input, repeatPassword.input, setPassword, setRepeatPassword));
    e.preventDefault();
    console.log(haveErrors);
    if (!haveErrors.find(hasError => hasError == true)) {
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
                label="Enter your first name"
                fullWidth
                autoFocus
                required
                inputRef={input => firstName.input = input}
                error={firstName.error}
                helperText={firstName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Enter your last name"
                fullWidth
                required
                inputRef={input => lastName.input = input}
                error={lastName.error}
                helperText={lastName.helperText}
              />
              <TextField
                className={classes.textField}
                label="Enter the password"
                fullWidth
                required
                inputRef={input => password.input = input}
                error={password.error}
                helperText={password.helperText}
                type="password"
              />
              <TextField
                className={classes.textField}
                label="Repeat the password"
                fullWidth
                required
                inputRef={input => repeatPassword.input = input}
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
