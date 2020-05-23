import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import EditPerformer from 'components/user/performers/Edit';
import NewPerformer from 'components/user/performers/New';
type TParams = {id: string};

function UserPerformerPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  return (
    <div>{match.params.id ? <EditPerformer id={id} /> : <NewPerformer />}</div>
  );
}

export default UserPerformerPage;
