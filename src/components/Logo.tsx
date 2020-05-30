import React from 'react';
import {NavLink} from 'react-router-dom';

function Logo() {
  return (
    <div className='logo'>
      <NavLink to='/'>
        <img src='/images/logo.svg' alt='logo' />
      </NavLink>
    </div>
  );
}

export default Logo;
