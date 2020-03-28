import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Header from 'components/Header';
import EditVenue from 'components/user/venues/Edit';
import NewVenue from 'components/user/venues/New';
type TParams = {id: string};

function UserVenuePage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  return (
    <div>
      <Header page='venues/new' />
      {match.params.id ? <EditVenue id={id} /> : <NewVenue />}
    </div>
  );
}

export default UserVenuePage;
