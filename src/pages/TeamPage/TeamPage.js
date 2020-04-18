import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as validator from '../../helpers/inputValidator';

//components
import Menu from '../../components/Menu/Menu';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import InvitationDialog from '../../components/InvitationDialog/InvitationDialog'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import TablePagination from '@material-ui/core/TablePagination';

import { useStyles } from './TeamPage.styles';

const TeamPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    axios.defaults.headers.common = {'Authorization': localStorage.getItem('token')}
    getUsers();
  }, [])

  const classes = useStyles();

  const sendInvitation = () => {
    const errors = [];
    errors.push(validator.validateField(email.input, setEmail, validator.validateEmail));
    if (!errors.find(error => error === true)) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/user/invite?email=${email.input.value}`)
        .then(res => {
          setInvitationDialog(false);
          setAlert({ open: true, message: 'An invitation email for the employee was sent successfully!', severity: 'success' });
        })
        .catch(err => {
          setInvitationDialog(false);
          console.log(err);
          setAlert({ open: true, message: err.message, severity: 'error' });
        });
    }
  }

  function getUsers() {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/user/list`)
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err.response);
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
    <div>
      <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Menu>
        <div className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            My Team
          </Typography>
          <Button variant="contained" color="primary" raised="true" onClick={() => setInvitationDialog(true)}>INIVITE NEW EMPLOYEE</Button>
        </div>
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
      </Menu>
      <InvitationDialog invitationDialog={invitationDialog} setInvitationDialog={setInvitationDialog} email={email} sendInvitation={sendInvitation} />
    </div>
  );
}

export default TeamPage;
