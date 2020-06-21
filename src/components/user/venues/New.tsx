import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import NotificationContext from 'contexts/NotificationContext';

import UserContext from 'contexts/UserContext';
import Form from './Form';
import BasicVenueInterface from 'interfaces/BasicVenueInterface';

import '../../../styles/pages/user/_SharedForm.scss';

function NewVenue() {
  const history = useHistory();
  const {user} = useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const {setNotification} = useContext(NotificationContext);
  const defaultValues: BasicVenueInterface = {
    name: '',
    email: user.email || '',
    address: '',
    details: '',
    location: '',
    phone: '',
    website: '',
  };

  async function save(values: BasicVenueInterface) {
    try {
      const resp = await axios.post(`${host}/user/venues`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      history.push(`/user/venues/${resp.data.id}/edit`);
    } catch (e) {
      setNotification({type: 'error', message: 'Error while saving a venue.'});
    }
  }

  return (
    <div className='new-form'>
      <h3 className='black'>New Venue</h3>

      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewVenue);
