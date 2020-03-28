import React, {useState} from 'react';
import {useFetch} from 'hooks/useFetch';
import BookingItem from './Item';
import UserContext from 'contexts/UserContext';
import BookingItemInterface from 'interfaces/BookingItemInterface';
const host = process.env.REACT_APP_API_HOST;

function BookingsList() {
  const {user} = React.useContext(UserContext);

  const [active, setActive] = useState<Boolean>(false);
  const url = `${host}/user/bookings`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  const showBookingsList = () => {
    setActive(active ? false : true);
  };

  return (
    <div className='bookings'>
      <button onClick={showBookingsList}>Bookings</button>
      <ul className={active ? 'active' : ''}>
        {results.map((row: BookingItemInterface) => {
          return (
            <BookingItem
              id={row.id}
              requester_id={row.requester_id}
              requester_type={row.requester_type}
              requested_id={row.requested_id}
              requested_type={row.requested_type}
              booking_date={row.booking_date}
              performer_name={row.performer_name}
              venue_name={row.venue_name}
              key={`booking-${row.id}`}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BookingsList;
