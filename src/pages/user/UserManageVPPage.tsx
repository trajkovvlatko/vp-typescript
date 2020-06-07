import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import UserPerformersPage from './UserPerformersPage';
import UserVenuesPage from './UserVenuesPage';

import '../../styles/pages/user/UserManageVP.scss';

function UserManageVPPage() {
  return (
    <div className='manage-vp'>
      <h3 className='black'>Manage</h3>
      <ul className='manage-menu'>
        <li>
          <NavLink exact to='/user/manage/performers'>
            My performers
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/user/manage/venues'>
            My venues
          </NavLink>
        </li>
      </ul>

      <Route path='/user/manage/performers' component={UserPerformersPage} />
      <Route path='/user/manage/venues' component={UserVenuesPage} />
    </div>
  );
}

export default UserManageVPPage;
