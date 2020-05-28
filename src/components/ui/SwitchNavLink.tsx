import React from 'react';
import {NavLink} from 'react-router-dom';

import '../../styles/components/ui/SwitchNavLink.scss';

interface Props {
  to: string;
  label: string;
  current: string;
  type?: string;
}

function SwitchNavLink(props: Props) {
  const type = props.type || 'primary';
  const {to, current, label} = props;
  return (
    <>
      {(to === current && (
        <span className='nav-link disabled'>{label}</span>
      )) || (
        <NavLink className={`nav-link ${type}`} exact to={to}>
          {label}
        </NavLink>
      )}
    </>
  );
}

export default SwitchNavLink;
