import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';

import NotificationContext from 'contexts/NotificationContext';
import UserContext from 'contexts/UserContext';

import Form from './Form';
import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';

function NewPerformer(props: RouteComponentProps) {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const host = process.env.REACT_APP_API_HOST;
  const defaultValues: BasicPerformerInterface = {
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  async function save(values: BasicPerformerInterface) {
    try {
      const resp = await axios.post(`${host}/user/performers`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      props.history.push(`/user/performers/${resp.data.id}/edit`);
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'Error while saving a performer.',
      });
    }
  }

  return (
    <div>
      <h1>New Performer</h1>

      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewPerformer);
