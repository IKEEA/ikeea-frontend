import React, { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../../context/LoadingContext';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from './UserEditDialog.styles';

const UserEditDialog = ({open, setOpen, user, getUsers, setAlert}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [setLoading] = useContext(LoadingContext);
  const classes = useStyles();

  useEffect(() => {
    setCurrentUser(user);
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const getAllUsers = () => {
    setLoading(true);
    axios
        .get(`${process.env.REACT_APP_SERVER_URL}/api/user/list`)
        .then(res => {
          setAllUsers(res.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };

  const changeLimit = (e) => {
    let editUser = {...currentUser};
    editUser.restrictionDays = e.target.value;
    setCurrentUser(editUser);
  }

  const changeManager = (e) => {
    let editUser = {...currentUser};
    editUser.managerId = e.target.value;
    setCurrentUser(editUser);
  }

  const editUser = () => {
    setLoading(true);
    setOpen(false);
    axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/user/${currentUser.id}/update-for-leader`, {restrictionDays: currentUser.restrictionDays, managerId: currentUser.managerId})
        .then(res => {
          getUsers();
          setLoading(false);
          setAlert({ open: true, message: 'Information updated successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
        <DialogTitle>Change learning days limit</DialogTitle>
        <DialogContent>
            <TextField
                label="Limit"
                fullWidth
                type="number"
                InputProps={{ inputProps: { min: 0, max: 99 } }}
                value={currentUser.restrictionDays ? currentUser.restrictionDays : null}
                onChange={(e) => changeLimit(e)}
                onInput={(e)=>{ 
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
                }}
            />
        </DialogContent>
        <DialogTitle>Change manager</DialogTitle>
            <DialogContent>
                <FormControl className={classes.fullWidth}>
                    <InputLabel>Users</InputLabel>
                    <Select onChange={(e) => changeManager(e)} value={currentUser.managerId}>
                      {allUsers.filter(user => user.id !== currentUser.id).map(user => {
                        return <MenuItem key={user.id} value={user.id}>{user.email}</MenuItem>
                      })}
                    </Select>
                </FormControl>
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
    </div>
    
  );
}

export default UserEditDialog;
