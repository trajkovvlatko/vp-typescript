import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import {useLocalStorage} from 'hooks/useLocalStorage';
import BookingsList from 'components/user/bookings/List';
import SwitchNavLink from '../ui/SwitchNavLink';
import Logo from '../Logo';

import {ExpandMore, ExpandLess} from '@material-ui/icons';

function FullHeader() {
  const {user, setUser} = React.useContext(UserContext);
  const arr = useLocalStorage('vp-user', {});
  const setLocalStorageValue = arr[1];
  const current = useLocation().pathname;
  const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

  const logout = () => {
    setUser({});
    setLocalStorageValue({});
  };

  const toggleUserMenu = () => {
    setUserMenuActive(!userMenuActive);
  };

  return (
    <div className='full-header row'>
      <div className='col col-1 col-1-sm'>
        <Logo />
      </div>

      <ul className='col col-11 right menu'>
        {(user.token && (
          <>
            <li>
              <BookingsList />
            </li>
            <li className='with-left-separator'>
              <div onClick={toggleUserMenu}>
                <span>{user.name}</span>
                <span>
                  {(userMenuActive && <ExpandLess></ExpandLess>) || (
                    <ExpandMore></ExpandMore>
                  )}
                </span>
              </div>

              <ul className={`user-menu ${(userMenuActive && 'active') || ''}`}>
                <li onClick={toggleUserMenu}>
                  <Link to='/user'>My profile</Link>
                </li>
                <li onClick={toggleUserMenu}>
                  <Link to='/user'>Upcoming events</Link>
                </li>
                <li className='with-top-separator' onClick={toggleUserMenu}>
                  <div className='logout' onClick={logout}>
                    Logout
                  </div>
                </li>
              </ul>
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
