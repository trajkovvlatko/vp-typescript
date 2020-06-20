export default interface BookingItemInterface {
  id: number;
  requesterId: number;
  requesterType: string;
  requestedId: number;
  requestedType: string;
  bookingDate: string;
  performerName: string;
  venueName: string;
  createdAt: string;
}
