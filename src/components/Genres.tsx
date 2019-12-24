import React from 'react';
import Genre from './Genre';
import { useFetch } from '../hooks/useFetch';
import GenreInterface from '../interfaces/GenreInterface';
import IdsListInterface from '../interfaces/IdsListInterface';

interface Props {
  values: string[];
  onChange: (params: IdsListInterface) => void;
}

function Genres(props: Props) {
  const url: string = `${process.env.REACT_APP_API_HOST}/genres`;
  const { error, loading, results } = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  let selected: number[] = props.values.map(g => parseInt(g));

  function onChange(strValue: string, checked: boolean) {
    const value = parseInt(strValue);
    let newGenres: number[] = selected;
    if (checked) {
      newGenres = [...newGenres, value];
    } else {
      newGenres = selected.filter(g => g !== value);
    }
    selected = newGenres;
    props.onChange({ ids: newGenres });
  }

  return (
    <div>
      {results.map((genre: GenreInterface) => (
        <Genre
          checked={selected.indexOf(genre.id) > -1}
          genre={genre}
          key={`genre-${genre.name}`}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default Genres;
