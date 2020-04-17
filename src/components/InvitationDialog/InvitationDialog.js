import React from 'react';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const InvitationDialog = ({ invitationDialog, setInvitationDialog, email, sendInvitation }) => {


    return (
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
    );
}

export default InvitationDialog;