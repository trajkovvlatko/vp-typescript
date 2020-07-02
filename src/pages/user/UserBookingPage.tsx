import React, {useContext, useState} from 'react';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import {useFetch} from 'hooks/useFetch';
import UserContext from 'contexts/UserContext';
import BookingsContext from 'contexts/BookingsContext';
import NotificationContext from 'contexts/NotificationContext';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

import 'styles/pages/user/UserBookingPage.scss';
import BookingRow from 'components/user/bookings/Row';

const host = process.env.REACT_APP_API_HOST;

function UserBookingPage({match}: any, key: any) {
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

  const sendRequest = async (status: string) => {
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

    try {
      await axios.patch(`${host}/user/bookings/${result.id}`, {status}, config);
      setStatus(status);
      setNotification({type: 'info', message: 'Successfully sent.'});
      const newBookings = bookings.filter((row: UpcomingBookingInterface) => {
        if (row.id === result.id) row.status = status;
        return row.id !== result.id;
      });
      setBookings(newBookings);
    } catch (e) {
      setNotification({type: 'info', message: 'Error while sending.'});
    }
  };

  const accept = () => sendRequest('accepted');
  const reject = () => sendRequest('rejected');

  const {
    requesterId,
    requesterType,
    requestedId,
    performerName,
    venueName,
    performerImageUrl,
    venueImageUrl,
  } = result;

  return (
    <div className='user-booking-page'>
      <div className='col-6 card'>
        {(requesterType === 'Performer' && (
          <>
            <BookingRow
              type='performer'
              id={requesterId}
              image={performerImageUrl}
              name={performerName}
            />

            <div className='term col-9'>requested to perform at</div>

            <BookingRow
              type='venue'
              id={requestedId}
              image={venueImageUrl}
              name={venueName}
            />

            <div className='term col-9'>on {result.bookingDate}.</div>
          </>
        )) || (
          <>
            <BookingRow
              type='venue'
              id={requesterId}
              image={venueImageUrl}
              name={venueName}
            />

            <div className='term col-9'>invited</div>

            <BookingRow
              type='performer'
              id={requestedId}
              image={performerImageUrl}
              name={performerName}
            />

            <div className='term col-9'>
              to perform on {result.bookingDate}.
            </div>
          </>
        )}

        <div className='actions center'>
          {(status === 'requested' && (
            <>
              <button className='nav-link primary' onClick={accept}>
                Accept
              </button>
              <button className='nav-link danger' onClick={reject}>
                Reject
              </button>
            </>
          )) || (
            <>
              This request is <b>{status}</b>.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserBookingPage;
