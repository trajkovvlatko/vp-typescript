import React, {useState, useContext} from 'react';
import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

interface SelectedInterface {
  id?: number;
  name?: string;
}

function BookSelector(props: Props) {
  const selectedType =
    props.connectType === 'performer' ? 'venue' : 'performer';
  const url = `${host}/user/${selectedType}s/active`;
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const {error, loading, results} = useFetch(url, user.token);
  const [selected, setSelected] = useState<SelectedInterface>();
  const [date, setDate] = useState<string>('2012-01-02');
  const [booked, setBooked] = useState<boolean>(false);

  if (error) return <div>Error while fetching data.</div>;
  if (loading) return <div>Loading...</div>;

  function onBookableSelect(e: React.ChangeEvent<{value: unknown}>) {
    const selectedId = parseInt(e.target.value as string);
    const row = results.filter(
      (r: SelectedInterface) => r.id === selectedId
    )[0];
    setSelected(row);
  }

  async function sendBookingRequest() {
    if (!selected || !selected.id) {
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
        `${host}/user/bookings/${date}/${selectedType}/${selected.id}/${props.connectType}/${props.connectId}`,
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
      <FormControl variant='filled'>
        <InputLabel id='booking-label'>Select {selectedType}</InputLabel>
        <Select
          labelId='booking-label'
          id='booking-select'
          value={selected ? selected.id : `Select ${selectedType}`}
          onChange={onBookableSelect}
          label='Select location'
        >
          <MenuItem value='' disabled>
            <em>Select {selectedType}</em>
          </MenuItem>
          {results.map((row: {id: number; name: string}) => {
            return (
              <MenuItem value={row.id} key={`book-item-${row.id}`}>
                {row.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

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
