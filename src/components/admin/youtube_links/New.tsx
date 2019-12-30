import React from 'react';

interface Props {
  link: string;
  remove: (link: string) => void;
}

function New(props: Props) {
  const {link, remove} = props;
  return (
    <div>
      {link}
      <button onClick={() => remove(link)}>Remove</button>
    </div>
  );
}

export default New;
