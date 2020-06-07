import React from 'react';
import {Link} from 'react-router-dom';

import '../../styles/components/user/UserHeader.scss';

import {
  CalendarToday,
  SentimentSatisfied,
  NotificationsOutlined,
} from '@material-ui/icons';

function UserHeader() {
  return (
    <div className='user-header'>
      <ul>
        <li>
          <Link to='/user'>
            <CalendarToday />
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link to='/user'>
            <SentimentSatisfied />
            <span>My profile</span>
          </Link>
        </li>
        <li>
          <Link to='/user'>
            <NotificationsOutlined />
            <span>Notifications</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default UserHeader;
