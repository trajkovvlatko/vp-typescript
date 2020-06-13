import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface Props {
  value: string;
  onChange: (data: {type: string; ids: string[]}) => void;
}

function TypeDropDown(props: Props) {
  function handleChange(e: React.ChangeEvent<{value: unknown}>) {
    props.onChange({type: e.target.value as string, ids: []});
  }

  return (
    <div>
      <FormControl>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={props.value}
          onChange={handleChange}
        >
          <MenuItem value='performer'>Performer</MenuItem>
          <MenuItem value='venue'>Venue</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default TypeDropDown;
