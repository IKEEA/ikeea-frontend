import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import TeamPage from './pages/TeamPage/TeamPage';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ErrorsContext } from './context/ErrorsContext';
import { UserContext } from './context/UserContext';
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
  const [user, setUser] = useState({ roles: ['UNAUTHORIZED'] });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      axios.defaults.headers.common = {'Authorization': localStorage.getItem('token')}
      getUserProfile();
    }
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
    setLoading(true);
    axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/user/profile`)
    .then(res => {
      setUser(res.data);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      // setLoginError('Error while getting profile information, please try again later.');
    });
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      <ErrorsContext.Provider value={[errors, setErrors]}>
        <MuiThemeProvider theme={theme}>
          {
            loading ?
            <CircularProgress size={100} thickness={5} className={classes.spinner}/> :
            <BrowserRouter>
            <Switch>
              <AuthRoute exact path='/' user={user} roles={['DEVELOPER', 'LEADER']}><MainPage/></AuthRoute>
              <AuthRoute path='/login' user={user} roles={['UNAUTHORIZED']}><LoginPage userLogin={userLogin} loginError={loginError}/></AuthRoute>
              {/*TBD AuthRoute for registration page*/}
              <AuthRoute path='/registration/:token' user={user} roles={['UNAUTHORIZED']}><RegistrationPage/></AuthRoute>
              <AuthRoute exact path='/profile' user={user} roles={['DEVELOPER', 'LEADER']}><ProfilePage/></AuthRoute>
              <AuthRoute exact path='/profile' user={user} roles={['DEVELOPER', 'LEADER']}><ProfilePage/></AuthRoute>
              <AuthRoute exact path='/myTeam' user={user} roles={['LEADER']}><TeamPage/></AuthRoute>
              <Route path='/error' component={ErrorPage} />
              <Redirect to='/' />
            </Switch>
          </BrowserRouter>
          }
        </MuiThemeProvider>
      </ErrorsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;