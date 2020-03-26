import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import UserContext from 'contexts/UserContext';

const host = process.env.REACT_APP_API_HOST;

type TParams = {id: string};

function NotificationPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  const {user} = React.useContext(UserContext);
  const url = `${host}/admin/notifications/${id}`;
  const {error, loading, results: notification} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  return (
    <div>
      <Header page='home' />
      <h1>{notification.id}</h1>
    </div>
  );
}

export default NotificationPage;
