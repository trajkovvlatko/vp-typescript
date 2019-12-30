import React from 'react';

interface Props {
  id: number;
  link: string;
  remove: (id: number) => void;
}

function Persisted(props: Props) {
  const {id, link, remove} = props;
  return (
    <div>
      {link}
      <button onClick={() => remove(id)}>Remove</button>
    </div>
  );
}

export default Persisted;
