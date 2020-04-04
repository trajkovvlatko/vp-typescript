import React, {useContext, useState, useEffect} from 'react';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';
import {useFetch} from 'hooks/useFetch';
import UpcomingBookingItem from './UpcomingBookingItem';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
const host = process.env.REACT_APP_API_HOST;

function UpcomingBookings() {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const url = `${host}/user/bookings/upcoming`;
  const {error, loading, results} = useFetch(url, user.token);
  const [rows, setRows] = useState(results);

  useEffect(() => {
    setRows(results);
  }, [results, setRows]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  function cancel(id: number) {
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
    axios
      .patch(`${host}/user/bookings/${id}`, {status}, config)
      .then(function (response) {
        setNotification({type: 'info', message: 'Successfully sent.'});
        const newRows = rows.map((row: UpcomingBookingInterface) => {
          if (row.id === id) row.status = status;
          return row;
        });
        setRows(newRows);
      })
      .catch(function (error) {
        setNotification({type: 'info', message: 'Error while sending.'});
      });
  }

  return (
    <div>
      <h2>Upcoming events</h2>
      {(rows.length > 0 && (
        <ul className='upcoming-bookings'>
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
