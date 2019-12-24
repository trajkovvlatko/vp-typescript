import React, { useState } from 'react';
import Type from './Type';
import Location from './Location';
import { withRouter } from 'react-router-dom';

interface Props {
  history: {
    push: (path: string) => void;
  };
}

interface StateInterface {
  type: string;
  location: string;
}

interface UpdateStateInterface {
  type?: string;
  location?: string;
}

function BasicSearch(props: Props) {
  const [state, setState] = useState<StateInterface>({
    type: 'performer',
    location: 'sweden',
  });

  function update(data: UpdateStateInterface) {
    setState({ ...state, ...data });
  }

  function onSearch() {
    props.history.push(`/search/${state.type}/${state.location}`);
  }

  return (
    <div>
      <h2>Basic search</h2>
      I'm looking for a:
      <Type
        value="performer"
        active={state.type === 'performer'}
        onClick={update}
      />
      <Type value="venue" active={state.type === 'venue'} onClick={update} />
      in:
      <Location value={state.location} onChange={update} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default withRouter(BasicSearch);
