import React from 'react';
import {Link} from 'react-router-dom';
import UpcomingBookings from 'components/user/bookings/Upcoming';

function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <div>
        <Link to='/user/performers'>My performers</Link>
      </div>
      <div>
        <Link to='/user/venues'>My venues</Link>
      </div>

      <UpcomingBookings />
    </div>
  );
}

export default UserPage;
