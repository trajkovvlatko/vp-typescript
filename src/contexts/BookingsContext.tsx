import React from 'react';
import UpcomingBookingInterface from 'interfaces/UpcomingBookingInterface';

interface BookingsContextInterface {
  bookings: UpcomingBookingInterface[];
  setBookings: (bookings: UpcomingBookingInterface[]) => void;
}

const defaultBookings: UpcomingBookingInterface[] = [];
const setBookings = () => defaultBookings;
const defaults = {bookings: [], setBookings: setBookings};
const BookingsContext = React.createContext<BookingsContextInterface>(defaults);
export default BookingsContext;
