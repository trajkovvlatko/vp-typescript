import React from 'react';
import {Link} from 'react-router-dom';

import BookingItemInterface from 'interfaces/BookingItemInterface';

function BookingItem(props: BookingItemInterface) {
  return (
    <li>
      <Link to={`/user/bookings/${props.id}`}>
        {(props.requesterType === 'performer' && (
          <span>
            <b>{props.performerName}</b> requested to perform at{' '}
            <b>{props.venueName}</b>
          </span>
        )) || (
          <span>
            <b>{props.venueName}</b> invited <b>{props.performerName}</b> to
            perform
          </span>
        )}
        <span>on {props.bookingDate}</span>
        <div className='created-at'>{props.createdAt.substring(0, 10)}</div>
      </Link>
    </li>
  );
}

export default BookingItem;
