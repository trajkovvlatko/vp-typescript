import React from 'react';

interface NotificationInterface {
  type: string;
  message: string;
}

interface NotificationContextInterface {
  notification: NotificationInterface;
  setNotification: (data: NotificationInterface) => void;
}

const NotificationContext = React.createContext<NotificationContextInterface>({
  notification: {type: '', message: ''},
  setNotification: (data: {}) => {},
});

export default NotificationContext;
