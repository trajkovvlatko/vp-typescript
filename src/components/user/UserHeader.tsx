import React from 'react';
import {NavLink} from 'react-router-dom';

import '../../styles/components/user/UserHeader.scss';

import {
  CalendarToday,
  SentimentSatisfied,
  MusicNoteOutlined,
} from '@material-ui/icons';

function UserHeader() {
  return (
    <div className='user-header'>
      <ul>
        <li>
          <NavLink exact to='/user'>
            <CalendarToday />
            <span>Events</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/user/manage'>
            <MusicNoteOutlined />
            <span>Manage my VP</span>
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/user/profile'>
            <SentimentSatisfied />
            <span>My profile</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default UserHeader;
