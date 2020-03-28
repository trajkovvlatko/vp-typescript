import React from 'react';
import {useFetch} from 'hooks/useFetch';
import PropertyInterface from 'interfaces/PropertyInterface';
import PropertyCheckbox from './Checkbox';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import UserContext from 'contexts/UserContext';
import useNotification from 'hooks/useNotification';

interface Props {
  venueId: number;
  selected: number[];
}

function PropertiesForm(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/properties`;
  const {error, loading, results} = useFetch(url);
  const {selected} = props;
  const [notification, setNotification] = useNotification();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  async function save() {
    try {
      await axios.patch(
        `${host}/user/venues/${props.venueId}/properties`,
        {property_ids: selected},
        {headers: getAuthHeader(user.token as string)}
      );
      setNotification({
        type: 'info',
        message: 'Successfully saved properties.',
      });
    } catch (e) {
      setNotification({
        type: 'error',
        message: 'Error while saving properties.',
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = parseInt(e.target.value);
    const isChecked = e.target.checked;
    if (isChecked) {
      selected.push(id);
    } else {
      const index = selected.indexOf(id);
      if (index !== -1) selected.splice(index, 1);
    }
  }

  return (
    <div>
      <h2>Properties</h2>

      {notification && (
        <p>
          <b>{notification.type.toUpperCase()}</b>: {notification.message}
        </p>
      )}

      {results.map((row: PropertyInterface) => {
        return (
          <PropertyCheckbox
            id={row.id}
            name={row.name}
            key={`property-${row.id}`}
            onChange={handleChange}
            checked={props.selected.includes(row.id)}
          />
        );
      })}
      <button onClick={save}>Save properties</button>
    </div>
  );
}

export default PropertiesForm;
