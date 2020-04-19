import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from './UserEditDialog.styles';

const UserEditDialog = ({open, setOpen, user}) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  function changeRole(e) {
    let editUser = {...currentUser};;
    editUser.roles = [e.target.value];
    setCurrentUser(editUser);
  }

  function changeLimit(e) {
    let editUser = {...currentUser};
    editUser.learningDays = e.target.value;
    setCurrentUser(editUser);
  }


  const editUser = () => {
    axios
        .put(`${process.env.REACT_APP_SERVER_URL}/api/user/${currentUser.id}/update`, currentUser)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response);
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
                value={currentUser.learningDays ? currentUser.learningDays : 0}
                onChange={(e) => changeLimit(e)}
            />
        </DialogContent>
        <DialogTitle>Change learning days limit</DialogTitle>
        <DialogContent>
        <FormControl className={classes.formControl}>
            <InputLabel>Role</InputLabel>
            <Select
                value={currentUser.roles ? currentUser.roles[0] : ''}
                onChange={(e) => changeRole(e)}
            >
            <MenuItem value={'DEVELOPER'}>DEVELOPER</MenuItem>
            <MenuItem value={'LEADER'}>LEADER</MenuItem>
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
  );
}

export default UserEditDialog;
