import React from 'react';
import {useLocation, NavLink} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import {useLocalStorage} from 'hooks/useLocalStorage';
import SwitchNavLink from './ui/SwitchNavLink';

function Header() {
  const {user, setUser} = React.useContext(UserContext);
  const arr = useLocalStorage('vp-user', {});
  const setLocalStorageValue = arr[1];
  const current = useLocation().pathname;

  function logout() {
    setUser({});
    setLocalStorageValue({});
  }

  return (
    <div className='header'>
      <div className='logo'>
        <NavLink to='/'>
          <img src='/images/logo.svg' alt='logo' />
        </NavLink>
      </div>

      <ul className='menu'>
        {(user.token && (
          <>
            <li>
              <SwitchNavLink to='/user' current={current} label='User' />
            </li>
            <li>
              <div className='logout' onClick={logout}>
                Logout
              </div>
            </li>
          </>
        )) || (
          <>
            <li>
              <SwitchNavLink
                to='/register'
                current={current}
                label='Register'
                type='secondary'
              />
            </li>
            <li>
              <SwitchNavLink to='/login' current={current} label='Login' />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
