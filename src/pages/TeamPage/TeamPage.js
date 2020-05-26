import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as validator from '../../helpers/inputValidator';
import { UserContext } from './../../context/UserContext';
import { LoadingContext } from '../../context/LoadingContext';

//components
import Menu from '../../components/Menu/Menu';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import InvitationDialog from '../../components/InvitationDialog/InvitationDialog';
import TeamTable from '../../components/TeamTable/TeamTable';
import AllUsersEditDialog from '../../components/AllUsersEditDialog/AllUsersEditDialog';

import { useStyles } from './TeamPage.styles';

const TeamPage = () => {
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [user] = useContext(UserContext);
  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getUsers() {
    setLoading(true);
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/manager/${user.id}/users`)
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      setLoading(false);
    });
  }

  const sendInvitation = () => {
    setLoading(true);
    const errors = [];
    errors.push(validator.validateField(email.input, setEmail, validator.validateEmail));
    if (!errors.find(error => error === true)) {
      setInvitationDialog(false);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/user/invite?email=${email.input.value}`)
        .then(res => {
          getUsers();
          setLoading(false);
          setAlert({ open: true, message: 'An invitation email for the employee was sent successfully!', severity: 'success' });
        })
        .catch(err => {
          setLoading(false);
          setAlert({ open: true, message: err.response.data.message, severity: 'error' });
        });
    } else {
      setLoading(false);
    }
  }

  const closeInvitationDialog = () => {
      setInvitationDialog(false);
      setEmail({ input: null, error: false, helperText: null });
  }

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={600000} onClose={() => setAlert({ open: false, message: null })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setAlert({ open: false, message: null })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Menu>
        <div className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            My Team
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setInvitationDialog(true)}>Invite new employee</Button>
          <Button className={classes.limitButton} variant="contained" color="primary" onClick={() => setEditDialogOpen(true)}>Change all team learning days limit</Button>
        </div>
        <TeamTable users={users} getUsers={getUsers} setAlert={setAlert} />
      </Menu>
      <InvitationDialog invitationDialog={invitationDialog} closeInvitationDialog={closeInvitationDialog} email={email} sendInvitation={sendInvitation} />
      <AllUsersEditDialog open={editDialogOpen} setOpen={setEditDialogOpen} getUsers={getUsers} setAlert={setAlert}/>
    </div>
  );
}

export default TeamPage;
