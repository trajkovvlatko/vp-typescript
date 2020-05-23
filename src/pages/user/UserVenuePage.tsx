import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import EditVenue from 'components/user/venues/Edit';
import NewVenue from 'components/user/venues/New';
type TParams = {id: string};

function UserVenuePage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  return <div>{match.params.id ? <EditVenue id={id} /> : <NewVenue />}</div>;
}

export default UserVenuePage;
