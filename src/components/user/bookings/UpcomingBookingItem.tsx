import React from 'react';
import {Link} from 'react-router-dom';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

interface Props {
  row: UpcomingBookingInterface;
  cancel: (id: number) => void;
}

function UpcomingBookingItem(props: Props) {
  const {row, cancel} = props;

  return (
    <li className={row.status}>
      <Link to={`/venues/${row.venue_id}`}>{row.venue_name}</Link> -
      <Link to={`/performers/${row.performer_id}`}>{row.performer_name}</Link>
      on
      {row.booking_date.replace('T', ' ').substring(0, 16)}
      {row.status !== 'canceled' && (
        <button onClick={() => cancel(row.id)}>Cancel</button>
      )}
    </li>
  );
}

export default UpcomingBookingItem;
