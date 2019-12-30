import React from 'react';
import {useFetch} from '../../../../hooks/useFetch';
import GenreInterface from '../../../../interfaces/GenreInterface';
import GenreCheckbox from './Checkbox';
import axios from 'axios';
import {getHeader} from '../../../../helpers/main';
import UserContext from '../../../../contexts/UserContext';

interface Props {
  performerId: number;
  selected: number[];
}

function GenresForm(props: Props) {
  const {user} = React.useContext(UserContext);
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/genres`;
  const {error, loading, results} = useFetch(url);
  const {selected} = props;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  async function save() {
    // add try catch and error notification
    const resp = await axios.patch(
      `${host}/admin/performers/${props.performerId}`,
      {genre_ids: selected},
      getHeader(user.token as string)
    );
    console.log(resp);
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
      <h2>Genres</h2>
      {results.map((row: GenreInterface) => {
        return (
          <GenreCheckbox
            id={row.id}
            name={row.name}
            key={`genre-${row.id}`}
            onChange={handleChange}
            checked={props.selected.includes(row.id)}
          />
        );
      })}
      <button onClick={save}>Save genres</button>
    </div>
  );
}

export default GenresForm;
