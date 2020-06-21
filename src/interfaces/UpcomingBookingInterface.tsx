import BookingItemInterface from './BookingItemInterface';

export default interface UpcomingBookingInterface extends BookingItemInterface {
  id: number;
  bookingDate: string;
  status: string;
  performerId: number;
  performerName: string;
  performerImageUrl: string;
  venueId: number;
  venueName: string;
  venueImageUrl: string;
  venueAddress: string;
}
