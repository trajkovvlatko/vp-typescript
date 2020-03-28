import React, {useState} from 'react';
import {useFetch} from 'hooks/useFetch';
import NotificationItem from './Item';
import UserContext from 'contexts/UserContext';
const host = process.env.REACT_APP_API_HOST;

function NotificatonsList() {
  const {user} = React.useContext(UserContext);

  const [active, setActive] = useState<Boolean>(false);
  const url = `${host}/user/notifications`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  const showNotificationsList = () => {
    setActive(active ? false : true);
  };

  return (
    <div className='notifications'>
      <button onClick={showNotificationsList}>Notifications</button>
      <ul className={active ? 'active' : ''}>
        {results.map((row: {id: number; message: string}) => {
          return (
            <NotificationItem
              id={row.id}
              message={row.message}
              key={`notification-${row.id}`}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default NotificatonsList;
