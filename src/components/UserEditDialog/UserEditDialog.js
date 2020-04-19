import React from 'react';

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

const UserEditDialog = ({open, setOpen}) => {
  const classes = useStyles();

  const editUser = () => {

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
            />
        </DialogContent>
        <DialogTitle>Change learning days limit</DialogTitle>
        <DialogContent>
        <FormControl className={classes.formControl}>
            <InputLabel>Role</InputLabel>
            <Select
            value={'DEVELOPER'}
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
            <Button onClick={editUser} color="primary">
                Update
        </Button>
        </DialogActions>
    </Dialog>
  );
}

export default UserEditDialog;
