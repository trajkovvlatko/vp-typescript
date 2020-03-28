import React from 'react';
import Header from 'components/Header';
import List from 'components/user/List';

function UserPerformersPage() {
  return (
    <div>
      <Header page='' />
      <h3>Performers</h3>
      <List type='performer' />
    </div>
  );
}

export default UserPerformersPage;
