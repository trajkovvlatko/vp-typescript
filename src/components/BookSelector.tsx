import React, {useState, useContext} from 'react';
import axios from 'axios';

import {useFetch} from 'hooks/useFetch';

import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

import {getAuthHeader} from 'helpers/main';

import '../styles/components/BookingSelector.scss';

const host = process.env.REACT_APP_API_HOST;

interface Props {
  connectId: number;
  connectType: string;
}

function BookSelector(props: Props) {
  const selectedType =
    props.connectType === 'performer' ? 'venue' : 'performer';
  const url = `${host}/user/${selectedType}s/active`;
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const {error, loading, results} = useFetch(url, user.token);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [date, setDate] = useState<string>('2012-01-02');
  const [booked, setBooked] = useState<boolean>(false);

  if (error) return <div>Error while fetching data.</div>;
  if (loading) return <div>Loading...</div>;

  function onBookableSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedId(parseInt(e.target.value));
  }

  async function sendBookingRequest() {
    if (!selectedId) {
      return setNotification({
        type: 'error',
        message: `Select a ${selectedType} first.`,
      });
    }
    const config = {
      headers: {
        ...getAuthHeader(user.token as string),
        ...{'content-type': 'multipart/form-data'},
      },
    };

    try {
      await axios.post(
        `${host}/user/bookings/${date}/${selectedType}/${selectedId}/${props.connectType}/${props.connectId}`,
        {},
        config
      );
      setNotification({type: 'info', message: 'Booking request sent.'});
      setBooked(true);
    } catch (e) {
      setNotification({type: 'info', message: 'Error while booking.'});
    }
  }

  return (
    <div className='booking-selector'>
      <select onChange={onBookableSelect}>
        <option key='bookable-default' value=''>
          Select {selectedType}
        </option>
        {results.map((row: {id: number; name: string}) => {
          return (
            <option key={`bookable-${row.id}`} value={row.id}>
              {row.name}
            </option>
          );
        })}
      </select>

      <input
        type='text'
        placeholder='Select date and time'
        value={date.toString()}
        onChange={(e) => setDate(e.target.value)}
      />

      {(booked && <h5>Booked successfully.</h5>) || (
        <button className='nav-link primary' onClick={sendBookingRequest}>
          Book now
        </button>
      )}
    </div>
  );
}

export default BookSelector;
