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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './TopicsPage.styles';

const TopicsPage = () => {
  const [invitationDialog, setInvitationDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const [email, setEmail] = useState({ input: null, error: false, helperText: null });
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [user] = useContext(UserContext);
  const [setLoading] = useContext(LoadingContext);

  const classes = useStyles();

  useEffect(() => {
    getTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getTopics() {
    setLoading(true);
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/topic/list`)
    .then(res => {
      setTopics(res.data);
      console.log(res.data);
      setLoading(false);
    })
    .catch(err => {
      setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      setLoading(false);
    });
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
            Topics
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setInvitationDialog(true)}>Add new topic</Button>
     </div>
     {
         topics.length !== null ? topics.filter(topic => topic.parentId === null).map((value, index) => {
             return (
             <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography className={classes.heading}>
                    <TextField
                        className={classes.root}
                        label="Title"
                        defaultValue={value.title}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.content}>
                    <TextField
                        className={classes.description}
                        label="Description"
                        multiline
                        rows={3}
                        defaultValue={value.description}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <b>Subtopics</b>
                    {topics.filter(topic => topic.parentId === value.id).map((childTopic, index) => {
                        return <div>{childTopic.title}</div>
                     }) }
                </ExpansionPanelDetails>
           </ExpansionPanel>);
         }) :
         null
     }
      
      </Menu>
    </div>
  );
}

export default TopicsPage;
