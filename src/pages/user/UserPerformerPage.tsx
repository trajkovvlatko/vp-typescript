import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import Header from 'components/Header';
import EditPerformer from 'components/user/performers/Edit';
import NewPerformer from 'components/user/performers/New';
type TParams = {id: string};

function UserPerformerPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  return (
    <div>
      <Header page='performers/new' />
      {match.params.id ? <EditPerformer id={id} /> : <NewPerformer />}
    </div>
  );
}

export default UserPerformerPage;
