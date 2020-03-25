import React, { useState, useEffect } from 'react';
import './RegistrationPage.scss';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as constants from '../../constants/RegistrationPage.constants.js';
import { useHistory, useParams } from 'react-router-dom';
import { getEmailFromToken } from '../../helpers/registrationHelpers';

function RegistrationPage() {

  const [email, setEmail] = useState({ value: null });
  const [firstName, setFirstName] = useState({ value: null, error: false, helperText: null });
  const [lastName, setLastName] = useState({ value: null, error: false, helperText: null });
  const [password, setPassword] = useState({ value: null, error: false, helperText: null });
  const [repeatPassword, setRepeatPassword] = useState({ value: null, error: false, helperText: null });
  const history = useHistory();
  const params = useParams();

  const register = e => {
    e.preventDefault();
    history.push("/");
  }

  return (
    <div>
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <CardHeader title="Register" />
          <CardContent>
            <TextField
              defaultValue={email.value}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              autoFocus
              required
            />
            <TextField
              label="Enter your first name"
              fullWidth
              autoFocus
              required
              inputRef={input => firstName.value = input}
              error={firstName.error}
              helperText={firstName.helperText}
            />
            <TextField
              label="Enter your last name"
              fullWidth
              required
              inputRef={input => lastName.value = input}
              error={lastName.error}
              helperText={lastName.helperText}
            />
            <TextField
              label="Enter the password"
              fullWidth
              required
              inputRef={input => password.value = input}
              error={password.error}
              helperText={password.helperText}
            />
            <TextField
              label="Repeat the password"
              fullWidth
              required
              inputRef={input => repeatPassword.value = input}
              error={repeatPassword.error}
              helperText={repeatPassword.helperText}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" color="primary" onClick={(e) => register(e)} raised>Register</Button>
          </CardActions>
        </Grid>
      </Container>
    </div>
  );
}

export default RegistrationPage;
