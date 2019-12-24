import React from 'react';

interface Props {
  active: boolean;
  value: string;
  onClick: (data: { type: string }) => void;
}

function Type(props: Props) {
  function onClick() {
    props.onClick({ type: props.value });
  }

  return (
    <div className="type">
      <button onClick={onClick} className={props.active ? 'active' : ''}>
        {props.value}
      </button>
    </div>
  );
}

export default Type;
