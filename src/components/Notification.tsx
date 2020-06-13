import React, {useState, useEffect, useContext} from 'react';
import NotificationContext from 'contexts/NotificationContext';

import '../styles/components/Notification.scss';

function Notification() {
  const {notification} = useContext(NotificationContext);
  const [active, setActive] = useState<boolean>(
    notification.type !== '' && notification.message !== ''
  );

  useEffect(() => {
    const timer = setTimeout(() => setActive(false), 4000);
    setActive(notification.type !== '' && notification.message !== '');
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className={`notification ${active ? 'active' : ''}`}>
      {active && (
        <div className='notification-content'>
          <div className={`side ${notification.type}`}></div>
          <p>
            <b>{notification.type.toUpperCase()}</b>: {notification.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Notification;
