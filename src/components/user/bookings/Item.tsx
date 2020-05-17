import React from 'react';
import {Link} from 'react-router-dom';

import BookingItemInterface from 'interfaces/BookingItemInterface';

function BookingItem(props: BookingItemInterface) {
  return (
    <div>
      <Link to={`/bookings/${props.id}`}>
        {(props.requesterType === 'performer' && (
          <div>
            {props.performerName} requested to perform at {props.venueName}
          </div>
        )) || (
          <div>
            {props.venueName} invited {props.performerName}
          </div>
        )}
        on {props.bookingDate.substring(0, 10)}
      </Link>
    </div>
  );
}

export default BookingItem;
