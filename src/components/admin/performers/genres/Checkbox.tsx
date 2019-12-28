import React from 'react';
import Genre from '../../../../interfaces/GenreInterface';

interface GenreCheckboxInterface extends Genre {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function GenreCheckbox(props: GenreCheckboxInterface) {
  return (
    <div>
      <input
        type='checkbox'
        value={props.id}
        onChange={props.onChange}
        defaultChecked={props.checked}
      />{' '}
      {props.name}
    </div>
  );
}

export default GenreCheckbox;
