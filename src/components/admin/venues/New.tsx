import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';
import useNotification from 'hooks/useNotification';

import UserContext from 'contexts/UserContext';
import Form from './Form';
import BasicVenueInterface from 'interfaces/BasicVenueInterface';

function NewVenue(props: RouteComponentProps) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const [notification, setNotification] = useNotification();
  const defaultValues: BasicVenueInterface = {
    name: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  async function save(values: BasicVenueInterface) {
    try {
      const resp = await axios.post(`${host}/admin/venues`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      props.history.push(`/admin/venues/${resp.data.id}/edit`);
    } catch (e) {
      setNotification({type: 'error', message: 'Error while saving a venue.'});
    }
  }

  return (
    <div>
      <h1>New Venue</h1>

      {notification && (
        <p>
          <b>{notification.type.toUpperCase()}</b>: {notification.message}
        </p>
      )}

      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewVenue);
