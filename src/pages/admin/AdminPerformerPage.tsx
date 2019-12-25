import React from 'react';
import Header from '../../components/Header';
import EditPerformer from '../../components/admin/EditPerformer';
import NewPerformer from '../../components/admin/NewPerformer';

interface Props {
  match: {
    params: {
      id?: number;
    };
  };
}

function AdminPerformerPage(props: Props) {
  return (
    <div>
      <Header page='performers/new' />
      {props.match.params.id ? (
        <EditPerformer id={props.match.params.id} />
      ) : (
        <NewPerformer />
      )}
    </div>
  );
}

export default AdminPerformerPage;
