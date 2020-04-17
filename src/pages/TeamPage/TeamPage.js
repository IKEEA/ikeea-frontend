import React, { useState, useContext } from 'react';
import { UserContext } from './../../context/UserContext';
import Menu from '../../components/Menu/Menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useStyles } from './TeamPage.styles';
import * as validator from '../../helpers/inputValidator';
import axios from 'axios';


const TeamPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });

  const classes = useStyles();

  const sendInvitation = () => {

    const errors = [];
    errors.push(validator.validateField(email.input, setEmail, validator.validateEmail));
    if (!errors.find(error => error === true)) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/user/invite?email=${email.input.value}`)
        .then(res => {
          setInvitationDialog(false);
          setAlert({ open: true, message: 'An invitation email for the employee was sent successfully!', severity: 'success' });
        })
        .catch(err => {
          setInvitationDialog(false);
          console.log(err);
          setAlert({ open: true, message: err.message, severity: 'error' });
        });
    }
  }

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Menu>
        <Button variant="contained" color="primary" raised="true" onClick={() => setInvitationDialog(true)}>Invite</Button>
      </Menu>
      <Dialog open={invitationDialog} onClose={() => setInvitationDialog(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send an invitation to a new employee, please enter their email address:
          </DialogContentText>
          <TextField
            label="Email"
            fullWidth
            type="email"
            inputRef={input => email.input = input}
            error={email.error}
            helperText={email.helperText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvitationDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={sendInvitation} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TeamPage;
