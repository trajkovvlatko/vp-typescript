import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: number;
  message: string;
}

function NotificatonItem(props: Props) {
  return (
    <div>
      <Link to={`/notifications/${props.id}`}>{props.message}</Link>
    </div>
  );
}

export default NotificatonItem;
