import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Header from 'components/Header';
import EditVenue from 'components/admin/venues/Edit';
import NewVenue from 'components/admin/venues/New';
type TParams = {id: string};

function AdminVenuePage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  return (
    <div>
      <Header page='venues/new' />
      {match.params.id ? (
        <EditVenue id={id} />
      ) : (
        <NewVenue />
      )}
    </div>
  );
}

export default AdminVenuePage;
