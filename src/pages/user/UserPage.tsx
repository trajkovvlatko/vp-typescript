import React from 'react';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import AcceptedBookings from 'components/user/bookings/Accepted';

function UserPage() {
  return (
    <div>
      <Header page='user' />
      <h1>User Page</h1>
      <div>
        <Link to='/user/performers'>My performers</Link>
      </div>
      <div>
        <Link to='/user/venues'>My venues</Link>
      </div>

      <AcceptedBookings />
    </div>
  );
}

export default UserPage;
