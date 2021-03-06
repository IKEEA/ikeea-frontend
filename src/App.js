import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import TeamPage from './pages/TeamPage/TeamPage';
import TeamCalendarPage from './pages/TeamCalendarPage/TeamCalendarPage';
import TopicsPage from './pages/TopicsPage/TopicsPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import LearningTreePage from './pages/LearningTreePage/LearningTreePage';
import TeamLearingTreePage from './pages/TeamLearningTreePage/TeamLearningTreePage';

import { ErrorsContext } from './context/ErrorsContext';
import { UserContext } from './context/UserContext';
import { LoadingContext } from './context/LoadingContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import { useStyles } from './App.styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5'
    }
  }
});

const AuthRoute = props => {
  let hasRole = props.roles.some(role => props.user.roles.includes(role));
  if (hasRole) 
    return <Route {...props} />;
  else if (props.user.roles.includes('UNAUTHORIZED'))
    return <Redirect to='/login' />;
  else 
    return <Redirect to='/' />;
}

const App = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  const [haveRoles, setHaveRoles] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    axios.defaults.headers.common = {'Authorization': localStorage.getItem('token')}
    getUserProfile();
  }, [])

  function userLogin(email, password) {
    setLoginError('');
    axios
       .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, { email: email, password: password })
       .then(res => {
          localStorage.setItem('token', `Bearer ${res.data.accessToken}`);
          axios.defaults.headers.common = {'Authorization': localStorage.getItem('token')}
          getUserProfile();
       })
       .catch(err => {
          err.response ?
          setLoginError(`${err.response.data.error}: ${err.response.data.message}`) :
          setLoginError('System error, please try again later.');
       });
   }

  function getUserProfile() {
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/user/profile`)
    .then(res => {
      setUser(res.data);
      setLoading(false);
      setHaveRoles(true);
    })
    .catch(err => {
      setUser({ roles: ['UNAUTHORIZED'] });
      setLoading(false);
      setHaveRoles(true);
    });
  }

  return (
    <LoadingContext.Provider value={[setLoading]}>
      <UserContext.Provider value={[user, setUser]}>
        <ErrorsContext.Provider value={[errors, setErrors]}>
          <MuiThemeProvider theme={theme}>
              {loading && <div className={classes.overlay}><CircularProgress size={100} thickness={5} className={classes.spinner}/></div>}
              {haveRoles && <BrowserRouter>
                <Switch>
                  <AuthRoute exact path='/' user={user} roles={['DEVELOPER', 'LEADER']}><MainPage/></AuthRoute>
                  <AuthRoute path='/login' user={user} roles={['UNAUTHORIZED']}><LoginPage userLogin={userLogin} loginError={loginError}/></AuthRoute>
                  <AuthRoute path='/register/:token' user={user} roles={['UNAUTHORIZED']}><RegistrationPage/></AuthRoute>
                  <AuthRoute exact path='/profile' user={user} roles={['DEVELOPER', 'LEADER']}><ProfilePage/></AuthRoute>
                  <AuthRoute exact path='/profile' user={user} roles={['DEVELOPER', 'LEADER']}><ProfilePage/></AuthRoute>
                  <AuthRoute exact path='/manageTopics' user={user} roles={['DEVELOPER', 'LEADER']}><TopicsPage/></AuthRoute>
                  <AuthRoute exact path='/myTeam' user={user} roles={['LEADER']}><TeamPage/></AuthRoute>
                  <AuthRoute exact path='/teamCalendar' user={user} roles={['LEADER']}><TeamCalendarPage/></AuthRoute>
                  <AuthRoute exact path='/learningTree' user={user} roles={['DEVELOPER', 'LEADER']}><LearningTreePage/></AuthRoute>
                  <AuthRoute exact path='/teamLearningTree' user={user} roles={['LEADER']}><TeamLearingTreePage/></AuthRoute>
                  <Route path='/error' component={ErrorPage} />
                  <Redirect to='/' />
                </Switch>
              </BrowserRouter>}
          </MuiThemeProvider>
        </ErrorsContext.Provider>
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;