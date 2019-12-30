import React from 'react';
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';
import Form from './Form';
import {withRouter} from 'react-router-dom';
import BasicPerformerInterface from '../../../interfaces/BasicPerformerInterface';

interface Props {
  history: {
    push: (path: string) => void;
  };
}

function NewPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const defaultValues: BasicPerformerInterface = {
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  async function save(values: BasicPerformerInterface) {
    // TODO: Add try catch
    const resp = await axios.post(`${host}/admin/performers`, values, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    props.history.push(`/admin/performers/${resp.data.id}/edit`);
  }

  return (
    <div>
      <h1>New Performer</h1>
      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewPerformer);
