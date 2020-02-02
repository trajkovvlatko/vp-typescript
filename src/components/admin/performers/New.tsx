import React from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router-dom";
import axios from 'axios';

import UserContext from 'contexts/UserContext';
import Form from './Form';
import BasicPerformerInterface from 'interfaces/BasicPerformerInterface';

function NewPerformer(props: RouteComponentProps) {
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
