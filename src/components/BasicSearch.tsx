import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import Type from './Type';
import Location from './Location';
import {withRouter} from 'react-router-dom';

import '../styles/components/BasicSearch.scss';

interface StateInterface {
  type: string;
  location: string;
}

interface UpdateStateInterface {
  type?: string;
  location?: string;
}

function BasicSearch(props: RouteComponentProps) {
  const [state, setState] = useState<StateInterface>({
    type: 'Performer',
    location: 'sweden',
  });

  function update(data: UpdateStateInterface) {
    setState({...state, ...data});
  }

  function onSearch(data: UpdateStateInterface) {
    props.history.push(`/search/${state.type.toLowerCase()}/${data.location}`);
  }

  return (
    <div className='basic-search'>
      <Type
        value='Performer'
        active={state.type === 'Performer'}
        onClick={update}
      />
      <Type value='Venue' active={state.type === 'Venue'} onClick={update} />
      <Location value={state.location} onChange={onSearch} />
    </div>
  );
}

export default withRouter(BasicSearch);
