import React from 'react';
import Header from 'components/Header';
import List from 'components/user/List';

function UserVenuesPage() {
  return (
    <div>
      <Header page='' />
      <h3>Venues</h3>
      <List type='venue' />
    </div>
  );
}

export default UserVenuesPage;
