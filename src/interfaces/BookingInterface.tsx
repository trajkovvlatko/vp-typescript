export interface BasicBookingInterface {
  date: Date;
}

export interface PerformerBookingInterface extends BasicBookingInterface {
  venue_id: number;
  venue_name: string;
}

export interface VenueBookingInterface extends BasicBookingInterface {
  performer_id: number;
  performer_name: string;
}
