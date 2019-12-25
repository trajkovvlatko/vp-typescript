import React from 'react';
import GenresForm from '../../components/admin/GenresForm';

interface Props {
  id: number;
}

function EditPerformer(props: Props) {
  return (
    <div>
      <h1>Edit Performer</h1>

      <GenresForm performerId={props.id} />
    </div>
  );
}

export default EditPerformer;
