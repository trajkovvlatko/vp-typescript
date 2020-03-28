export default interface BookingItemInterface {
  id: number;
  requester_id: number;
  requester_type: string;
  requested_id: number;
  requested_type: string;
  booking_date: string;
  performer_name: string;
  venue_name: string;
}
