import React from 'react';
import NotificationContext from 'contexts/NotificationContext';

function Notification() {
  const {notification} = React.useContext(NotificationContext);

  return (
    <div>
      {notification.type && notification.message && (
        <p>
          <b>{notification.type.toUpperCase()}</b>: {notification.message}
        </p>
      )}
    </div>
  );
}

export default Notification;
