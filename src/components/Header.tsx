import React from 'react';
import {useLocation} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import {useLocalStorage} from 'hooks/useLocalStorage';
import SwitchNavLink from './SwitchNavLink';

function Header() {
  const {user, setUser} = React.useContext(UserContext);
  const [_, setLocalStorageValue] = useLocalStorage('vp-user', {});
  const current = useLocation().pathname;

  function logout() {
    setUser({});
    setLocalStorageValue({});
  }

  return (
    <div>
      <SwitchNavLink to='/' current={current} label='Home' />
      {(user.token && (
        <div key='logged-in'>
          <SwitchNavLink to='/user' current={current} label='User' />
          <div className='logout' onClick={logout}>
            Logout
          </div>
        </div>
      )) || [
        <div key='logged-out'>
          <SwitchNavLink to='/login' current={current} label='Login' />
          <SwitchNavLink to='/register' current={current} label='Register' />
        </div>,
      ]}
    </div>
  );
}

export default Header;
