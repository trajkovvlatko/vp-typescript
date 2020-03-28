import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import FrontPage from 'pages/FrontPage';
import SearchPage from 'pages/SearchPage';
import PerformerPage from 'pages/PerformerPage';
import VenuePage from 'pages/VenuePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import BookingPage from 'pages/user/BookingPage';

import UserPage from 'pages/user/UserPage';
import UserPerformersPage from 'pages/user/UserPerformersPage';
import UserPerformerPage from 'pages/user/UserPerformerPage';
import UserVenuesPage from 'pages/user/UserVenuesPage';
import UserVenuePage from 'pages/user/UserVenuePage';

import WithUser from 'components/WithUser';
import BookingsList from 'components/user/bookings/List';
import Notification from 'components/Notification';

import {useLocalStorage} from 'hooks/useLocalStorage';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

import 'styles/index.css';
import 'styles/App.css';

import * as serviceWorker from 'serviceWorker';

const App: React.FC = () => {
  const [user, setUser] = useLocalStorage('vp-user', {});
  const [notification, setNotification] = useState({type: '', message: ''});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <NotificationContext.Provider value={{notification, setNotification}}>
          <Notification />

          <WithUser>
            <BookingsList />
          </WithUser>

          <Switch>
            <Route exact path='/' component={FrontPage} />
            <Route
              path='/search/:type/:location/:ids?'
              component={SearchPage}
            />
            <Route path='/performers/:id' component={PerformerPage} />
            <Route path='/venues/:id' component={VenuePage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='/bookings/:id' component={BookingPage} />
            <WithUser>
              <React.Fragment>
                <Route exact path='/user' component={UserPage} />
                <Route
                  exact
                  path='/user/performers'
                  component={UserPerformersPage}
                />
                <Route exact path='/user/venues' component={UserVenuesPage} />
                <Route
                  path='/user/performers/:id/edit'
                  component={UserPerformerPage}
                />
                <Route
                  path='/user/performers/new'
                  component={UserPerformerPage}
                />
                <Route path='/user/venues/:id/edit' component={UserVenuePage} />
                <Route path='/user/venues/new' component={UserVenuePage} />
              </React.Fragment>
            </WithUser>
          </Switch>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
