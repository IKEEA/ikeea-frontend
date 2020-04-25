import React, { useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const UserDeleteDialog = ({open, setOpen, user, getUsers, setAlert}) => {
  const [setLoading] = useContext(LoadingContext);

  const deleteUser = () => {
    setLoading(true);
    setOpen(false);
    axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.id}/delete`)
        .then(res => {
          getUsers();
          setLoading(false);
          setAlert({ open: true, message: 'User deleted successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
            <div>{`Are you sure you want to delete ${user.email}?`}</div>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
                Cancel
        </Button>
            <Button onClick={() => deleteUser()} color="primary">
                Delete
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default UserDeleteDialog;
