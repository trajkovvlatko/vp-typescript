import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface Props {
  value: string;
  onChange: (data: {location: string}) => void;
}

function Location(props: Props) {
  function handleChange(e: React.ChangeEvent<{value: unknown}>) {
    props.onChange({location: e.target.value as string});
  }

  return (
    <div className='location'>
      <FormControl>
        <InputLabel id='demo-simple-select-outlined-label'>
          Select location
        </InputLabel>
        <Select
          labelId='demo-simple-select-outlined-label'
          id='demo-simple-select-outlined'
          value={props.value}
          onChange={handleChange}
          label='Select location'
        >
          <MenuItem value='' disabled>
            <em>Select location</em>
          </MenuItem>
          <MenuItem value='sweden'>Sweden</MenuItem>
          <MenuItem value='norway'>Norway</MenuItem>
          <MenuItem value='denmark'>Denmark</MenuItem>
          <MenuItem value='finland'>Finland</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Location;
