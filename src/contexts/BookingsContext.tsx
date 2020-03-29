import React from 'react';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

interface BookingsContextInterface {
  bookings: UpcomingBookingInterface[];
  setBookings: (bookings: UpcomingBookingInterface[]) => void;
}

const BookingsContext = React.createContext<BookingsContextInterface>({
  bookings: [],
  setBookings: (bookings: UpcomingBookingInterface[]) => {},
});

export default BookingsContext;
