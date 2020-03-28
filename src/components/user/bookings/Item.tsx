import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: number;
  message: string;
}

function BookingItem(props: Props) {
  return (
    <div>
      <Link to={`/bookings/${props.id}`}>{props.message}</Link>
    </div>
  );
}

export default BookingItem;
