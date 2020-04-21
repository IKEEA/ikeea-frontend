import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const UserEditDialog = ({open, setOpen, user, getUsers, setAlert}) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  function changeLimit(e) {
    let editUser = {...currentUser};
    editUser.restrictionDays = e.target.value;
    setCurrentUser(editUser);
  }

  const editUser = () => {
    axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/user/${currentUser.id}/update-restriction-days?restrictionDays=${currentUser.restrictionDays}`)
        .then(res => {
          getUsers();
          setOpen(false);
          setAlert({ open: true, message: 'Learning days limit updated successfully!', severity: 'success' });
        })
        .catch(err => {
          setOpen(false);
          setAlert({ open: true, message: err.message, severity: 'error' });
        });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>Change learning days limit</DialogTitle>
        <DialogContent>
            <TextField
                label="Limit"
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0, max: 365 } }}
                value={currentUser.restrictionDays ? currentUser.restrictionDays : 0}
                onChange={(e) => changeLimit(e)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Cancel
        </Button>
            <Button onClick={() => editUser()} color="primary">
                Update
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default UserEditDialog;
