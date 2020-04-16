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
import { useStyles } from './TeamPage.styles';


const TeamPage = () => {
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const classes = useStyles();

  const handleInviationDialogOpen = () => {
    setInvitationDialog(true);
  };

  const handleInviationDialogClose = () => {
    setInvitationDialog(false);
  };

  return (
    <div>
      <Menu>
        <Button variant="contained" color="primary" raised="true" onClick={handleInviationDialogOpen}>Invite</Button>
      </Menu>
      <Dialog open={invitationDialog} onClose={handleInviationDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send an invitation to a new employee, please enter their email address:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviationDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInviationDialogClose} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TeamPage;
