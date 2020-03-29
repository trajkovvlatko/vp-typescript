import BookingItemInterface from './BookingItemInterface';

export default interface UpcomingBookingInterface extends BookingItemInterface {
  performer_id: number;
  venue_id: number;
  status: string;
}
