import React, { useState } from 'react';
import axios from 'axios';

//components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TablePagination from '@material-ui/core/TablePagination';
import UserEditDialog from './../UserEditDialog/UserEditDialog';
import UserDeleteDialog from './../UserDeleteDialog/UserDeleteDialog';

import { useStyles } from './TeamTable.styles';
import AddGoalsDialog from '../AddGoalsDialog/AddGoalsDialog';

const TeamTable = ({ users, getUsers, setAlert }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [goalsDialogOpen, setGoalsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDialog = (userId, dialogType) => {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/user/${userId}/get`)
    .then(res => {
      setSelectedUser(res.data);
      switch(dialogType) {
        case 'goals':
          setGoalsDialogOpen(true);
          break;
        case 'edit':
          setEditDialogOpen(true);
          break;
        default:
          setDeleteDialogOpen(true);
      } 
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    });
  }

  return (
    <Paper>
        <TableContainer className={classes.table}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Surname</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Learning days left</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users).map((user) => (
                    <TableRow key={user.id}>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.roles[0]}</TableCell>
                    <TableCell align="left">{user.enabled ? <Chip size="small" label="Active" color="secondary" /> : <Chip size="small" label="Not active" />}</TableCell>
                    <TableCell align="left">{user.restrictionDays}</TableCell>
                    <TableCell align="left" className={classes.clickable} onClick={() => openDialog(user.id, 'goals')}>Goals</TableCell>
                    <TableCell align="left" className={classes.clickable} onClick={() => openDialog(user.id, 'edit')}>Edit</TableCell>
                    <TableCell align="left" className={classes.clickable} onClick={() => openDialog(user.id, 'delete')}>Delete</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <AddGoalsDialog open={goalsDialogOpen} setOpen={setGoalsDialogOpen} user={selectedUser} getUsers={getUsers} setAlert={setAlert}/>
        <UserEditDialog open={editDialogOpen} setOpen={setEditDialogOpen} user={selectedUser} getUsers={getUsers} setAlert={setAlert}/>
        <UserDeleteDialog open={deleteDialogOpen} setOpen={setDeleteDialogOpen} user={selectedUser} getUsers={getUsers} setAlert={setAlert}/>
    </Paper>
  );
}

export default TeamTable;
