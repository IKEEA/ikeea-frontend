import React, { useState } from 'react';
import './RegistrationPage.scss';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { CardHeader, CardContent, CardActions } from '@material-ui/core';
import Button from "@material-ui/core/Button";

function RegistrationPage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <div>
      <Container maxWidth="xs">
        <Grid container item justify="center">
          <CardHeader title="Register" />
          <CardContent>
            <TextField
              label="Enter your email"
              fullWidth
              autoFocus
              required
              inputRef={input => setFirstName(input)}
            />
            <TextField
              label="Enter your first name"
              fullWidth
              autoFocus
              required
              inputRef={input => setFirstName(input)}
            />
            <TextField
              label="Enter your last name"
              fullWidth
              required
              inputRef={input => setLastName(input)}
            />
            <TextField
              label="Enter the password"
              fullWidth
              required
              inputRef={input => setPassword(input)}
            />
            <TextField
              label="Repeat the password"
              fullWidth
              required
              inputRef={input => setRepeatPassword(input)}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" color="primary" raised>Register</Button>
          </CardActions>
        </Grid>
      </Container>
    </div>
  );
}

export default RegistrationPage;
