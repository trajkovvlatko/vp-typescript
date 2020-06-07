import React from 'react';
import List from 'components/user/List';
import {Link} from 'react-router-dom';

function UserPerformersPage() {
  return (
    <div>
      <Link to={`/user/performers/new`} className='add-new nav-link primary'>
        Add new
      </Link>
      <List type='performer' />
    </div>
  );
}

export default UserPerformersPage;
