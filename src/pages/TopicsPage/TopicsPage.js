import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoadingContext } from '../../context/LoadingContext';

//components
import Menu from '../../components/Menu/Menu';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import TopicCard from '../../components/TopicsList/TopicCard/TopicCard';
import NewTopicCard from '../../components/TopicsList/NewTopicCard/NewTopicCard';

import { useStyles } from './TopicsPage.styles';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: null, severity: null });
  const [setLoading] = useContext(LoadingContext);
  const [openNew, setOpenNew] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    getTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTopics = () => {
    setLoading(true);
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/topic/list`)
    .then(res => {
      setTopics(res.data);
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
          <Button variant="contained" color="primary" onClick={() => setOpenNew(true)}>Add new topic</Button>
     </div>
     {
        openNew ?
        <NewTopicCard setOpenNew={setOpenNew} getTopics={getTopics} setAlert={setAlert}/> :
        null
     }
     {
         topics.length !== null ? topics.filter(topic => topic.parentId === null).map((value, index) => {
             let subtopics = topics.filter(item => item.parentId === value.id);
             return (<TopicCard key={index} topic={value} subtopics={subtopics} getTopics={getTopics} setAlert={setAlert}/>);
         }) :
         null
     }
     </Menu>
    </div>
  );
}

export default TopicsPage;
