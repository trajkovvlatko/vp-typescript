import React from 'react';
import PropertyInterface from 'interfaces/PropertyInterface';

interface PropertyCheckboxInterface extends PropertyInterface {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PropertyCheckbox(props: PropertyCheckboxInterface) {
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

export default PropertyCheckbox;
