import React from 'react';
import axios from 'axios';
import {useForm} from '../../../hooks/useForm';
import UserContext from '../../../contexts/UserContext';
import Form from './Form';
import {withRouter} from 'react-router-dom';
import BasicPerformer from '../../../interfaces/BasicPerformer';

interface Props {
  history: {
    push: (path: string) => void;
  };
}

function NewPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const defaultValues: BasicPerformer = {
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  const [values, handleChange] = useForm(defaultValues);

  async function save() {
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
      <Form values={values} save={save} handleChange={handleChange} />
    </div>
  );
}

export default withRouter(NewPerformer);
