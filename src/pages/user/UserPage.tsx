import React from 'react';
import Header from 'components/Header';
import List from 'components/user/List';

function UserPage() {
  return (
    <div>
      <Header page='user' />
      <h1>User Page</h1>
      <h3>Performers</h3>
      <List type='performer' />
      ---------------
      <h3>Venues</h3>
      <List type='venue' />
    </div>
  );
}

export default UserPage;
