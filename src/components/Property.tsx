import React from 'react';
import PropertyInterface from '../interfaces/PropertyInterface';

interface Props {
  checked: boolean;
  property: PropertyInterface;
  onChange: (value: string, checked: boolean) => void;
}

function Property(props: Props) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value, e.target.checked);
  }

  return (
    <div>
      <input
        type="checkbox"
        value={props.property.id}
        defaultChecked={props.checked}
        onChange={onChange}
      />{' '}
      {props.property.name}
    </div>
  );
}

export default Property;
