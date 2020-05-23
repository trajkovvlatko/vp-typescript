import React from 'react';
import {NavLink} from 'react-router-dom';

interface Props {
  to: string;
  label: string;
  current: string;
}

function SwitchNavLink(props: Props) {
  const {to, current, label} = props;
  return (
    <div>
      {(to === current && <span>{label}</span>) || (
        <NavLink exact to={to}>
          {label}
        </NavLink>
      )}
    </div>
  );
}

export default SwitchNavLink;
