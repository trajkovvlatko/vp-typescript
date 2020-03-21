import React from 'react';

interface Props {
  id: number;
  name: string;
  selected: boolean;
  onClick: (id: number) => void;
}

function BookSelectorItem(props: Props) {
  function onClick() {
    props.onClick(props.id);
  }

  return (
    <div onClick={onClick}>
      {props.name}
      {props.selected && ' - selected'}
    </div>
  );
}

export default BookSelectorItem;
