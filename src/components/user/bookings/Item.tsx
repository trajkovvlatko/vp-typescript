import React from 'react';
import {Link} from 'react-router-dom';

import BookingItemInterface from 'interfaces/BookingItemInterface';

function BookingItem(props: BookingItemInterface) {
  return (
    <div>
      <Link to={`/bookings/${props.id}`}>
        {(props.requester_type === 'performer' && (
          <div>
            {props.performer_name} requested to perform at {props.venue_name}
          </div>
        )) || (
          <div>
            {props.venue_name} invited {props.performer_name}
          </div>
        )}
        on {props.booking_date.substring(0, 10)}
      </Link>
    </div>
  );
}

export default BookingItem;
