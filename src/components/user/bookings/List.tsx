import React, {useState} from 'react';
import {useFetch} from 'hooks/useFetch';
import BookingItem from './Item';
import UserContext from 'contexts/UserContext';
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
        {results.map((row: {id: number; message: string}) => {
          return (
            <BookingItem
              id={row.id}
              message={row.message}
              key={`booking-${row.id}`}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BookingsList;
