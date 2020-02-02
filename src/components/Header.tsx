import React from 'react';
import {Link} from 'react-router-dom';
import UserContext from 'contexts/UserContext';
import NavLink from 'components/NavLink';

interface Props {
  page: string;
}

function Header(props: Props) {
  const {user} = React.useContext(UserContext);

  return (
    <div>
      <Link to='/'>Home</Link>
      {(user.token && (
        <NavLink currentPage={props.page} label='Admin' page='admin' />
      )) || [
        <div>
          <NavLink currentPage={props.page} label='Login' page='login' />
          <NavLink currentPage={props.page} label='Register' page='register' />
        </div>,
      ]}
    </div>
  );
}

export default Header;
