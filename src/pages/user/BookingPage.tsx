import React, {useContext, useState} from 'react';
import axios from 'axios';

import {getAuthHeader} from 'helpers/main';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import UserContext from 'contexts/UserContext';
import BookingsContext from 'contexts/BookingsContext';
import NotificationContext from 'contexts/NotificationContext';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';
const host = process.env.REACT_APP_API_HOST;

function BookingPage({match}: any, key: any) {
  const id = parseInt(match.params.id);
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const {bookings, setBookings} = useContext(BookingsContext);
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
      .then(function (response) {
        setStatus(status);
        setNotification({type: 'info', message: 'Successfully sent.'});
        const newBookings = bookings.filter((row: UpcomingBookingInterface) => {
          if (row.id === result.id) row.status = status;
          return row.id !== result.id;
        });
        setBookings(newBookings);
      })
      .catch(function (error) {
        setNotification({type: 'info', message: 'Error while sending.'});
      });
  };

  const accept = () => sendRequest('accepted');
  const reject = () => sendRequest('rejected');

  return (
    <div>
      <Header page='home' />

      <div>
        {(result.requesterType === 'performer' && (
          <div>
            <Link to={`/performers/${result.performerId}`}>
              {result.performerName}
            </Link>
            requested to perform at
            <Link to={`/venues/${result.venueId}`}>{result.venueName}</Link>
          </div>
        )) || (
          <div>
            <Link to={`/venues/${result.venueId}`}>{result.venueName}</Link>
            invited
            <Link to={`/performers/${result.performerId}`}>
              {result.performerName}
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
          This request is <b>{status}</b>.
        </div>
      )}
    </div>
  );
}

export default BookingPage;
