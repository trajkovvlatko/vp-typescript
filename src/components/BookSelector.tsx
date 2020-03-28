import React, {useState} from 'react';
import {useFetch} from 'hooks/useFetch';
import BookSelectorItem from 'components/BookSelectorItem';
import UserContext from 'contexts/UserContext';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import useNotification from 'hooks/useNotification';
const host = process.env.REACT_APP_API_HOST;

interface Props {
  connectId: number;
  connectType: string;
}

function BookSelector(props: Props) {
  const selectedType =
    props.connectType === 'performer' ? 'venue' : 'performer';
  const url: string = `${host}/user/${selectedType}s/active`;
  const {user} = React.useContext(UserContext);
  const {error, loading, results} = useFetch(url, user.token);
  const [notification, setNotification] = useNotification();
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
      {notification && (
        <p>
          <b>{notification.type.toUpperCase()}</b>: {notification.message}
        </p>
      )}

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
