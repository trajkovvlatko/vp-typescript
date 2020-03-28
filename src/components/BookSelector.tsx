import React, {useState, useContext} from 'react';
import axios from 'axios';

import {useFetch} from 'hooks/useFetch';

import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

import BookSelectorItem from 'components/BookSelectorItem';
import {getAuthHeader} from 'helpers/main';
const host = process.env.REACT_APP_API_HOST;

interface Props {
  connectId: number;
  connectType: string;
}

function BookSelector(props: Props) {
  const selectedType =
    props.connectType === 'performer' ? 'venue' : 'performer';
  const url: string = `${host}/user/${selectedType}s/active`;
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const {error, loading, results} = useFetch(url, user.token);
  const [selectedId, setSelectedId] = useState<Number | undefined>();
  const [dateTime, setDateTime] = useState<String>('2012-01-02 03:04');

  if (error) return <div>Error while fetching data.</div>;
  if (loading) return <div>Loading...</div>;

  function onBookableClick(id: number) {
    setSelectedId(id);
  }

  function sendBookingRequest() {
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

    axios
      .post(
        `${host}/user/bookings/${dateTime}/${props.connectType}/${props.connectId}/${selectedType}/${selectedId}`,
        {},
        config
      )
      .then(function(response) {
        setNotification({type: 'info', message: 'Booking request sent.'});
      })
      .catch(function(error) {
        setNotification({type: 'info', message: 'Error while booking.'});
      });
  }

  return (
    <div>
      <ul>
        {results.map((row: {id: number; name: string}) => (
          <BookSelectorItem
            id={row.id}
            name={row.name}
            selected={row.id === selectedId}
            onClick={onBookableClick}
            key={`book-selector-item-${row.id}`}
          />
        ))}
      </ul>

      <input
        type='text'
        placeholder='Select date and time'
        value={dateTime.toString()}
        onChange={e => {
          setDateTime(e.target.value);
        }}
      />

      <button onClick={sendBookingRequest}>Send booking request</button>
    </div>
  );
}

export default BookSelector;
