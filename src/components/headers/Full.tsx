import React from 'react';
import {useLocation} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import {useLocalStorage} from 'hooks/useLocalStorage';
import SwitchNavLink from '../ui/SwitchNavLink';
import Logo from '../Logo';

function FullHeader() {
  const {user, setUser} = React.useContext(UserContext);
  const arr = useLocalStorage('vp-user', {});
  const setLocalStorageValue = arr[1];
  const current = useLocation().pathname;

  function logout() {
    setUser({});
    setLocalStorageValue({});
  }

  return (
    <div className='full-header row'>
      <div className='col col-1'>
        <Logo />
      </div>

      <ul className='col col-11 right menu'>
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

export default FullHeader;
