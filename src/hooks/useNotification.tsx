import {useState} from 'react';

interface WithNotificationInterface {
  type: 'error' | 'info';
  message: string;
}

type NotificationType = WithNotificationInterface | null;

const useNotification = (initialValues: NotificationType = null) => {
  return useState<NotificationType>(initialValues);
};
export default useNotification;
