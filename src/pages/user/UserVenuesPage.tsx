import React from 'react';
import List from 'components/user/List';
import {Link} from 'react-router-dom';

function UserVenuesPage() {
  return (
    <div>
      <Link to={`/user/venues/new`} className='add-new nav-link primary'>
        Add new
      </Link>
      <List type='venue' />
    </div>
  );
}

export default UserVenuesPage;
