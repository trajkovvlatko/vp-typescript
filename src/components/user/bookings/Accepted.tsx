import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import {useFetch} from 'hooks/useFetch';
import BookingItemInterface from 'interfaces/BookingItemInterface';
const host = process.env.REACT_APP_API_HOST;

interface AcceptedBookingInterface extends BookingItemInterface {
  performer_id: number;
  venue_id: number;
}

function AcceptedBookings() {
  const {user} = useContext(UserContext);
  const url = `${host}/user/bookings/accepted`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  return (
    <div>
      <h2>Upcoming events</h2>
      <ul>
        {results.map((row: AcceptedBookingInterface) => {
          return (
            <div key={`accepted-bookings-${row.id}`}>
              <Link to={`/venues/${row.venue_id}`}>{row.venue_name}</Link> -
              <Link to={`/performers/${row.performer_id}`}>
                {row.performer_name}
              </Link>
              on
              {row.booking_date.replace('T', ' ').substring(0, 16)}
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default AcceptedBookings;
