import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

import { ErrorsContext } from './context/ErrorsContext';
import { UserContext } from './context/UserContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5'
    }
  }
});

const AuthRoute = props => {
  if (!props.user.roles.includes('UNAUTHORIZED')) return <Redirect to="/" />;
  return <Route {...props} />;
};

const App = () => {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({ roles: ['UNAUTHORIZED'] });
  const [loginError, setLoginError] = useState('');

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
    })
    .catch(err => {
      // setLoginError('Error while getting profile information, please try again later.');
    });
  }

  return (
    <UserContext.Provider value={user}>
      <ErrorsContext.Provider value={[errors, setErrors]}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={MainPage} />
              <AuthRoute path='/login' user={user}>
                <LoginPage userLogin={userLogin} loginError={loginError}/>
              </AuthRoute>
              <Route path='/registration/:token' component={RegistrationPage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/error' component={ErrorPage} />
              <Redirect to='/' />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </ErrorsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;