import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import useNotification from 'hooks/useNotification';

import UserContext from 'contexts/UserContext';
import Form from './Form';
import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';

function NewPerformer(props: RouteComponentProps) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const [notification, setNotification] = useNotification();
  const defaultValues: BasicPerformerInterface = {
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  async function save(values: BasicPerformerInterface) {
    try {
      const resp = await axios.post(`${host}/admin/performers`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      props.history.push(`/admin/performers/${resp.data.id}/edit`);
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

      {notification && (
        <p>
          <b>{notification.type.toUpperCase()}</b>: {notification.message}
        </p>
      )}

      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewPerformer);
