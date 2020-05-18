import React, {useContext, useState} from 'react';
import {useFetch} from 'hooks/useFetch';
import GenreInterface from 'interfaces/GenreInterface';
import GenreCheckbox from './Checkbox';
import axios from 'axios';
import {getAuthHeader} from 'helpers/main';
import UserContext from 'contexts/UserContext';
import NotificationContext from 'contexts/NotificationContext';

interface Props {
  performerId: number;
  selected: number[];
}

function GenresForm(props: Props) {
  const {user} = useContext(UserContext);
  const {setNotification} = useContext(NotificationContext);
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/genres`;
  const {error, loading, results} = useFetch(url);
  const [selected, setSelected] = useState<number[]>(props.selected);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  async function save() {
    try {
      const response = await axios.patch(
        `${host}/user/performers/${props.performerId}/genres`,
        {genre_ids: selected},
        {headers: getAuthHeader(user.token as string)}
      );
      setSelected(response.data.map((r: GenreInterface) => r.id));
      setNotification({type: 'info', message: 'Successfully saved genres.'});
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
    setSelected(selected);
  }

  return (
    <div>
      <h2>Genres</h2>

      {results.map((row: GenreInterface) => {
        return (
          <GenreCheckbox
            id={row.id}
            name={row.name}
            key={`genre-${row.id}`}
            onChange={handleChange}
            checked={selected.includes(row.id)}
          />
        );
      })}
      <button onClick={save}>Save genres</button>
    </div>
  );
}

export default GenresForm;
