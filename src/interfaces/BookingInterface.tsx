export interface BasicBookingInterface {
  date: Date;
}

export interface PerformerBookingInterface extends BasicBookingInterface {
  venueId: number;
  venueName: string;
}

export interface VenueBookingInterface extends BasicBookingInterface {
  performerId: number;
  performerName: string;
}
