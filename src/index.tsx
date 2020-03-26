import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import FrontPage from 'pages/FrontPage';
import SearchPage from 'pages/SearchPage';
import PerformerPage from 'pages/PerformerPage';
import VenuePage from 'pages/VenuePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import NotificationPage from 'pages/NotificationPage';
import AdminPage from 'pages/admin/AdminPage';
import AdminPerformerPage from 'pages/admin/AdminPerformerPage';
import AdminVenuePage from 'pages/admin/AdminVenuePage';

import WithUser from 'components/WithUser';
import Notifications from 'components/Notifications';

import {useLocalStorage} from 'hooks/useLocalStorage';
import UserContext from 'contexts/UserContext';

import 'styles/index.css';
import 'styles/App.css';

import * as serviceWorker from 'serviceWorker';

const App: React.FC = () => {
  const [user, setUser] = useLocalStorage('vp-user', {});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <WithUser>
          <Notifications />
        </WithUser>
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route path='/search/:type/:location/:ids?' component={SearchPage} />
          <Route path='/performers/:id' component={PerformerPage} />
          <Route path='/venues/:id' component={VenuePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/notifications/:id' component={NotificationPage} />
          <Route exact path='/admin' component={AdminPage} />
          <Route
            path='/admin/performers/:id/edit'
            component={AdminPerformerPage}
          />
          <Route path='/admin/performers/new' component={AdminPerformerPage} />
          <Route path='/admin/venues/:id/edit' component={AdminVenuePage} />
          <Route path='/admin/venues/new' component={AdminVenuePage} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
