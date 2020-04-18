import React, { useState, useEffect } from 'react';
import axios from 'axios';

//components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from './TeamTable.styles';

const TeamTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [])

  function getUsers() {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/user/list`)
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                </TableRow>
            </TableHead>
            <TableBody>
                {
                !loading ? (rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users).map((user) => (
                    <TableRow key={user.id}>
                    <TableCell align="left">{user.firstName}</TableCell>
                    <TableCell align="left">{user.lastName}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.roles[0].name}</TableCell>
                    <TableCell align="left">{user.enabled ? <Chip size="small" label="Active" color="secondary" /> : <Chip size="small" label="Not active" />}</TableCell>
                    <TableCell align="left">{user.learningDays}</TableCell>
                    <TableCell align="left">Goals</TableCell>
                    <TableCell align="left">Edit</TableCell>
                    </TableRow>
                )) : 
                <tr>
                    <Skeleton width="1000px"/>
                    <Skeleton animation={false} />
                    <Skeleton animation="wave" />
                </tr>
                }
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
    </Paper>
  );
}

export default TeamTable;
