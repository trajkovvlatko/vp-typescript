import React, {useEffect, useState} from 'react';
import GenresForm from '../GenresForm';
import UserContext from '../../../contexts/UserContext';
import BasicPerformer from '../../../interfaces/BasicPerformer';
import Form from './Form';
import axios from 'axios';

interface Props {
  id: number;
}

interface EditBasicPerformer extends BasicPerformer {
  id: number;
}

function EditPerformer(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url: string = `${host}/admin/performers/${props.id}`;
  const columns = ['name', 'details', 'location', 'phone', 'website'];
  const defaultValues: EditBasicPerformer = {
    id: props.id,
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };
  const [values, setValues] = useState({
    loading: true,
    error: false,
    performer: defaultValues,
  });

  function getHeader(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  useEffect(() => {
    fetch(url, getHeader(user.token as string))
      .then(response => response.json())
      .then(response => {
        const newValues: EditBasicPerformer = {
          id: props.id,
          name: response.name,
          details: response.details,
          location: response.location,
          phone: response.phone,
          website: response.website,
        };
        setValues({
          loading: false,
          error: false,
          performer: newValues,
        });
      });
  }, []);

  async function update() {
    // TODO: add try catch
    const resp = await axios.patch(
      `${host}/admin/performers/${values.performer.id}`,
      values.performer,
      getHeader(user.token as string)
    );
    console.log('Updated!', resp);
  }

  function handleChange(e: {target: {name: string; value: any}}) {
    if (columns.indexOf(e.target.name) > -1) {
      values.performer = {
        ...values.performer,
        [e.target.name]: e.target.value,
      };
      setValues(values);
    }
  }

  if (values.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Performer</h1>
      <Form
        values={values.performer}
        save={update}
        handleChange={handleChange}
      />
      <GenresForm performerId={props.id} />
    </div>
  );
}

export default EditPerformer;
