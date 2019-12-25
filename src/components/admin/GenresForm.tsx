import React from 'react';
import {useFetch} from '../../hooks/useFetch';
import Genre from '../../interfaces/GenreInterface';
import GenreCheckbox from './GenreCheckbox';

interface Props {
  performerId: number;
}

function GenresForm(props: Props) {
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/genres`;
  const {error, loading, results} = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div>
      <h2>Genres</h2>
      list all genres here and add some for performer {props.performerId}
      {results.map((row: Genre) => {
        return (
          <GenreCheckbox id={row.id} name={row.name} key={`genre-${row.id}`} />
        );
      })}
    </div>
  );
}

export default GenresForm;
