import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';

import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

import {useFetch} from 'hooks/useFetch';

import UpcomingBookingItem from './UpcomingBookingItem';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

import {getAuthHeader} from 'helpers/main';

import '../../../styles/components/user/bookings/UpcomingBookings.scss';

const host = process.env.REACT_APP_API_HOST;

function UpcomingBookings() {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const url = `${host}/user/bookings/upcoming`;
  const {error, loading, results} = useFetch(url, user.token);
  const [rows, setRows] = useState(results);

  useEffect(() => setRows(results), [results, setRows]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  async function cancel(id: number) {
    if (!window.confirm(`Do you want to cancel this request?`)) {
      return;
    }

    const config = {
      headers: {
        ...getAuthHeader(user.token as string),
        ...{'content-type': 'application/json'},
      },
    };

    const status = 'canceled';
    try {
      await axios.patch(`${host}/user/bookings/${id}`, {status}, config);
      setNotification({type: 'info', message: 'Successfully sent.'});
      const newRows = rows.map((row: UpcomingBookingInterface) => {
        if (row.id === id) row.status = status;
        return row;
      });
      setRows(newRows);
    } catch (e) {
      setNotification({type: 'info', message: 'Error while sending.'});
    }
  }

  return (
    <div className='upcoming-bookings'>
      <h2>Events</h2>

      {(rows.length > 0 && (
        <ul>
          {rows.map((row: UpcomingBookingInterface) => {
            return (
              <UpcomingBookingItem
                row={row}
                cancel={cancel}
                key={`upcoming-booking-item-${row.id}`}
              />
            );
          })}
        </ul>
      )) || <div>No upcoming events.</div>}
    </div>
  );
}

export default UpcomingBookings;
