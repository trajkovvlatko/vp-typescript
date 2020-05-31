import React from 'react';
import TypeDropDown from './TypeDropDown';
import Location from './Location';
import Genres from './Genres';
import Properties from './Properties';
import FiltersInterface from 'interfaces/FiltersInterface';

interface Props {
  filters: FiltersInterface;
  onChange: (data: {}) => void;
}

const Filters: React.FC<Props> = (props) => {
  return (
    <div>
      <h4>Type</h4>

      <TypeDropDown value={props.filters.type} onChange={props.onChange} />
      <div className='ruler'></div>

      <h4>Location</h4>
      <Location value={props.filters.location} onChange={props.onChange} />
      <div className='ruler'></div>

      {(props.filters.type === 'performer' && (
        <Genres values={props.filters.ids} onChange={props.onChange} />
      )) || <Properties values={props.filters.ids} onChange={props.onChange} />}
    </div>
  );
};
export default Filters;
