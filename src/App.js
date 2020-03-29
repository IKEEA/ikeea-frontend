import React, { useState } from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { ErrorsContext } from './context/ErrorsContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

export default function App() {

  const [errors, setErrors] = useState({});

  return (
    <ErrorsContext.Provider value={[errors, setErrors]}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/registration/:token' component={RegistrationPage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/error' component={ErrorPage} />
            <Redirect to='/' />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </ErrorsContext.Provider>
  );
}