import React from 'react';
import UserContext from 'contexts/UserContext';

function WithUser(props: {children: JSX.Element}) {
  const {user} = React.useContext(UserContext);

  if (!user || !user.token) return <div>No user</div>;

  return <div>{props.children}</div>;
}

export default WithUser;
