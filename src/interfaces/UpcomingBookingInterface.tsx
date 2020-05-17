import BookingItemInterface from './BookingItemInterface';

export default interface UpcomingBookingInterface extends BookingItemInterface {
  performerId: number;
  venueId: number;
  status: string;
}
