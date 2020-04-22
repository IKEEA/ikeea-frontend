import React, { useState } from 'react';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const AllUsersEditDialog = ({open, setOpen, getUsers, setAlert}) => {
  const [limit, setLimit] = useState(0);

  const editAllUsers = () => {
    axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/users`)
        .then(res => {
          console.log(res.data);
          getUsers();
          setOpen(false);
          setAlert({ open: true, message: 'Learning days limit updated successfully!', severity: 'success' });
        })
        .catch(err => {
          console.log(err.response);
          setOpen(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>Change learning days limit for all team members</DialogTitle>
        <DialogContent>
            <TextField
                label="Limit"
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0, max: 365 } }}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Cancel
        </Button>
            <Button onClick={() => editAllUsers()} color="primary">
                Update
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default AllUsersEditDialog;
