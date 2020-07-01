import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import NotificationContext from 'contexts/NotificationContext';
import UserContext from 'contexts/UserContext';

import Form from './Form';
import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';

import 'styles/pages/user/_SharedForm.scss';

function NewPerformer() {
  const history = useHistory();
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const host = process.env.REACT_APP_API_HOST;
  const defaultValues: BasicPerformerInterface = {
    name: '',
    details: '',
    email: user.email || '',
    location: '',
    phone: '',
    website: '',
    active: false,
  };

  async function save(values: BasicPerformerInterface) {
    try {
      const resp = await axios.post(`${host}/user/performers`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      history.push(`/user/performers/${resp.data.id}/edit`);
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'Error while saving a performer.',
      });
    }
  }

  return (
    <div className='new-form'>
      <h3 className='black'>New Performer</h3>

      <Form values={defaultValues} save={save} />
    </div>
  );
}

export default withRouter(NewPerformer);
