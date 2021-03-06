import React, { useState, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import { UserContext } from '../../context/UserContext';
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
  const [user] = useContext(UserContext);
  const [setLoading] = useContext(LoadingContext);

  const editAllUsers = () => {
    setLoading(true);
    setOpen(false);
    axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}/set-restriction-days?restrictionDays=${limit}`)
        .then(res => {
          getUsers();
          setLoading(false);
          setLimit(0);
          setAlert({ open: true, message: 'Learning days limit updated successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setLimit(0);
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
