import React from 'react';
import {Link} from 'react-router-dom';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

import '../../../styles/components/user/bookings/UpcomingBookings.scss';

import {CalendarToday} from '@material-ui/icons';

interface Props {
  row: UpcomingBookingInterface;
  cancel: (id: number) => void;
}

function UpcomingBookingItem(props: Props) {
  const {row, cancel} = props;

  return (
    <li className={`col-4 upcoming-booking-item ${row.status}`}>
      <h3 className='title col-12'>
        <Link to={`/venues/${row.venueId}`}>{row.venueName}</Link>
      </h3>

      <div className='row'>
        <Link to={`/venues/${row.venueId}`}>
          <img src={row.venueImageUrl} alt='img' className='col-3' />
        </Link>

        <div className='col-9'>
          <h4 className='connected'>
            <Link to={`/performers/${row.performerId}`}>
              {row.performerName}
            </Link>
          </h4>

          <div>
            <CalendarToday />
            <span>{row.bookingDate}</span>
          </div>
        </div>
      </div>

      {row.status !== 'canceled' && (
        <button className='cancel-booking' onClick={() => cancel(row.id)}>
          Cancel
        </button>
      )}
    </li>
  );
}

export default UpcomingBookingItem;
