import React from 'react';
import GenreInterface from '../interfaces/GenreInterface';

interface Props {
  checked: boolean;
  genre: GenreInterface;
  onChange: (value: string, checked: boolean) => void;
}

function Genre(props: Props) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value, e.target.checked);
  }

  return (
    <div>
      <input
        type="checkbox"
        value={props.genre.id}
        defaultChecked={props.checked}
        onChange={onChange}
      />{' '}
      {props.genre.name}
    </div>
  );
}

export default Genre;
