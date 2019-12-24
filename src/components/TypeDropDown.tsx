import React from 'react';

interface Props {
  value: string;
  onChange: (data: { type: string; ids: string[] }) => void;
}

function TypeDropDown(props: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange({ type: e.target.value, ids: [] });
  }

  return (
    <div>
      <select defaultValue={props.value} onChange={handleChange}>
        <option value="performer">Performer</option>
        <option value="venue">Venue</option>
      </select>
    </div>
  );
}

export default TypeDropDown;
