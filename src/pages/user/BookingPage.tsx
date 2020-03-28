import React, {useContext, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';

import {getAuthHeader} from 'helpers/main';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';
const host = process.env.REACT_APP_API_HOST;

type TParams = {id: string};

function BookingPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const [status, setStatus] = useState<String>('');

  const url = `${host}/user/bookings/${id}`;
  const {error, loading, results: result} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  if (status === '') {
    setStatus(result.status);
  }

  const sendRequest = (status: string) => {
    const verb = status === 'accepted' ? 'accept' : 'reject';
    if (!window.confirm(`Do you want to ${verb} this request?`)) {
      return;
    }

    const config = {
      headers: {
        ...getAuthHeader(user.token as string),
        ...{'content-type': 'application/json'},
      },
    };

    axios
      .patch(`${host}/user/bookings/${result.id}`, {status}, config)
      .then(function(response) {
        setStatus(status);
        setNotification({type: 'info', message: 'Successfully sent.'});
      })
      .catch(function(error) {
        setNotification({type: 'info', message: 'Error while sending.'});
      });
  };

  const accept = () => sendRequest('accepted');
  const reject = () => sendRequest('rejected');

  return (
    <div>
      <Header page='home' />

      <div>
        {(result.requester_type === 'performer' && (
          <div>
            <Link to={`/performers/${result.performer_id}`}>
              {result.performer_name}
            </Link>
            requested to perform at
            <Link to={`/venues/${result.venue_id}`}>{result.venue_name}</Link>
          </div>
        )) || (
          <div>
            <Link to={`/venues/${result.venue_id}`}>{result.venue_name}</Link>
            invited
            <Link to={`/performers/${result.performer_id}`}>
              {result.performer_name}
            </Link>
          </div>
        )}
      </div>
      {(status === 'requested' && (
        <div>
          <button onClick={accept}>Accept</button>
          <button onClick={reject}>Reject</button>
        </div>
      )) || (
        <div>
          This request is already <b>{status}</b>.
        </div>
      )}
    </div>
  );
}

export default BookingPage;
