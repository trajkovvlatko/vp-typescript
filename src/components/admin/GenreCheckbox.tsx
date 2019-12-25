import React from 'react';
import Genre from '../../interfaces/GenreInterface';

function GenreCheckbox(props: Genre) {
  return (
    <div>
      <input type="checkbox" value={props.id} /> {props.name}
    </div>
  );
}

export default GenreCheckbox;