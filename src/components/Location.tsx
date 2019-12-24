import React from 'react';

interface Props {
  value: string;
  onChange: (data: { location: string }) => void;
}

function Location(props: Props) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    props.onChange({ location: e.target.value });
  }

  return (
    <div>
      <select value={props.value} onChange={handleChange}>
        <option value="sweden">Sweden</option>
        <option value="norway">Norway</option>
        <option value="denmark">Denmark</option>
        <option value="finland">Finland</option>
      </select>
    </div>
  );
}

export default Location;
