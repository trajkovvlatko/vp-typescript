import React from 'react';
import Header from '../../components/Header';
import PerformersList from '../../components/admin/PerformersList';

function AdminPage() {
  return (
    <div>
      <Header page='admin' />
      <h1>Admin Page</h1>
      <PerformersList />
    </div>
  );
}

export default AdminPage;
