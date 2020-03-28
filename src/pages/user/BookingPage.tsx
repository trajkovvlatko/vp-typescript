import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import axios from 'axios';

import {getAuthHeader} from 'helpers/main';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import UserContext from 'contexts/UserContext';
import useNotification from 'hooks/useNotification';
const host = process.env.REACT_APP_API_HOST;

type TParams = {id: string};

function BookingPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  const {user} = React.useContext(UserContext);
  const [notification, setNotification] = useNotification();

  const url = `${host}/user/bookings/${id}`;
  const {error, loading, results: result} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  const sendRequest = (status: string) => {
    const config = {
      headers: {
        ...getAuthHeader(user.token as string),
        ...{'content-type': 'application/json'},
      },
    };

    console.log(status);
    axios
      .patch(`${host}/user/bookings/${result.id}`, {status}, config)
      .then(function(response) {
        setNotification({type: 'info', message: 'Successfully sent.'});
      })
      .catch(function(error) {
        setNotification({type: 'info', message: 'Error while sending.'});
      });
  };

  const accept = () => sendRequest('accept');
  const reject = () => sendRequest('reject');

  return (
    <div>
      <Header page='home' />

      <div>
        {notification && (
          <p>
            <b>{notification.type.toUpperCase()}</b>: {notification.message}
          </p>
        )}
      </div>

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
      <div>
        <button onClick={accept}>Accept</button>
        <button onClick={reject}>Reject</button>
      </div>
    </div>
  );
}

export default BookingPage;
