import React from 'react';
import GenreInterface from 'interfaces/GenreInterface';

interface Props {
  checked: boolean;
  genre: GenreInterface;
  onChange: (value: string, checked: boolean) => void;
}

function Genre(props: Props) {
  const genre = props.genre;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value, e.target.checked);
  }

  return (
    <div>
      <label htmlFor={`genre-${genre.id}`}>
        <input
          type='checkbox'
          value={genre.id}
          defaultChecked={props.checked}
          onChange={onChange}
          id={`genre-${genre.id}`}
        />{' '}
        {genre.name}
      </label>
    </div>
  );
}

export default Genre;
