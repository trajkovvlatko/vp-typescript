import React from 'react';
import Header from 'components/Header';
import List from 'components/admin/List';

function AdminPage() {
  return (
    <div>
      <Header page='admin' />
      <h1>Admin Page</h1>
      <h3>Performers</h3>
      <List type='performer' />
      ---------------
      <h3>Venues</h3>
      <List type='venue'/>
    </div>
  );
}

export default AdminPage;
