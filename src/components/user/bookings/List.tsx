import React, {useContext, useState, useEffect} from 'react';
import {useFetch} from 'hooks/useFetch';
import BookingItem from './Item';
import UserContext from 'contexts/UserContext';
import BookingsContext from 'contexts/BookingsContext';
import BookingItemInterface from 'interfaces/BookingItemInterface';
import {
  NotificationsOutlined,
  NotificationsActiveOutlined,
} from '@material-ui/icons';

import '../../../styles/components/user/bookings/List.scss';

const host = process.env.REACT_APP_API_HOST;

function BookingsList() {
  const {user} = useContext(UserContext);
  const {bookings, setBookings} = useContext(BookingsContext);

  const [active, setActive] = useState<Boolean>(false);
  const url = `${host}/user/bookings/requested`;
  const {error, loading, results} = useFetch(url, user.token);

  useEffect(() => {
    setBookings(results);
  }, [results, setBookings]);

  if (loading) return <></>;
  if (error) return <div>Error while fetching data.</div>;

  const showBookingsList = () => {
    setActive(active ? false : true);
  };

  return (
    <div className='bookings'>
      <div onClick={showBookingsList}>
        {(bookings.length > 0 && (
          <NotificationsActiveOutlined></NotificationsActiveOutlined>
        )) || <NotificationsOutlined></NotificationsOutlined>}
      </div>

      <div className={`list ${active ? 'active' : ''}`}>
        {(bookings.length > 0 && (
          <ul>
            {bookings.map((row: BookingItemInterface) => {
              return (
                <BookingItem
                  id={row.id}
                  requesterId={row.requesterId}
                  requesterType={row.requesterType}
                  requestedId={row.requestedId}
                  requestedType={row.requestedType}
                  bookingDate={row.bookingDate}
                  performerName={row.performerName}
                  venueName={row.venueName}
                  key={`booking-${row.id}`}
                />
              );
            })}
          </ul>
        )) || <div>No booking requests yet.</div>}
      </div>
    </div>
  );
}

export default BookingsList;
