import React from 'react';
import List from 'components/user/List';

function UserVenuesPage() {
  return (
    <div>
      <h3>Venues</h3>
      <List type='venue' />
    </div>
  );
}

export default UserVenuesPage;
