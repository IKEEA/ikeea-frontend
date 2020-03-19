import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

class App extends React.Component {

  render() {
    return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/registration/:token' component={RegistrationPage} />
        <Route path='/profile' component={ProfilePage} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
