import React from 'react';
import {Link} from 'react-router-dom';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

import {
  CalendarToday,
  LocalBarOutlined,
  LocationOnOutlined,
} from '@material-ui/icons';

interface Props {
  row: UpcomingBookingInterface;
  cancel: (id: number) => void;
}

function UpcomingBookingItem(props: Props) {
  const {row, cancel} = props;

  return (
    <li className={`col-4 upcoming-booking-item ${row.status}`}>
      <h3 className='title col-12'>
        <LocalBarOutlined />
        <Link to={`/venues/${row.venueId}`}>{row.venueName}</Link>
      </h3>

      <div className='row'>
        <Link to={`/venues/${row.venueId}`} className='col-4'>
          <img src={row.venueImageUrl} alt='img' />
        </Link>

        <div className='col-8'>
          <h4 className='connected'>
            <Link to={`/performers/${row.performerId}`}>
              {row.performerName}
            </Link>
          </h4>

          <div className='connected-info'>
            <div>
              <CalendarToday />
              <span>{row.bookingDate}</span>
            </div>

            <div>
              <LocationOnOutlined />
              <span>{row.venueAddress}</span>
            </div>
          </div>
        </div>
      </div>

      {(row.status !== 'canceled' && (
        <button className='cancel-booking' onClick={() => cancel(row.id)}>
          Cancel
        </button>
      )) || <div className='canceled-booking'>Canceled</div>}
    </li>
  );
}

export default UpcomingBookingItem;
