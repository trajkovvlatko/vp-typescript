import React from 'react';
import {Link} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import NavLink from 'components/NavLink';
import {useLocalStorage} from 'hooks/useLocalStorage';

interface Props {
  page: string;
}

function Header(props: Props) {
  const {user, setUser} = React.useContext(UserContext);
  const [_, setLocalStorageValue] = useLocalStorage('vp-user', {});

  function logout() {
    setUser({});
    setLocalStorageValue({});
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      {(user.token && (
        <div key='logged-in'>
          <NavLink currentPage={props.page} label='User' page='user' />
          <div className='logout' onClick={logout}>
            Logout
          </div>
        </div>
      )) || [
        <div key='logged-out'>
          <NavLink currentPage={props.page} label='Login' page='login' />
          <NavLink currentPage={props.page} label='Register' page='register' />
        </div>,
      ]}
    </div>
  );
}

export default Header;
