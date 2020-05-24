import React from 'react';

interface Props {
  label: string;
  style?: string;
}

function Button(props: Props) {
  const {label} = props;
  const style = props.style || 'primary';
  return <button className={style}>{label}</button>;
}

export default Button;
