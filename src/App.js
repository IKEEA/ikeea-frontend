import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

class App extends React.Component {

  render() {
    return (
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
    );
  }
}

export default withStore(App, initialState);
