import React from 'react';
import {useFetch} from '../hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import YoutubeLinkInterface from '../interfaces/YoutubeLinkInterface';
import ImageInterface from '../interfaces/ImageInterface';
import PropertyInterface from '../interfaces/PropertyInterface';
import {VenueBookingInterface} from '../interfaces/BookingInterface';

interface Props {
  match: {
    params: {
      id: number;
    };
  };
}

interface Venue {
  name: string;
  image: string;
  location: string;
  phone: string;
  website: string;
  rating: number;
  properties_list: PropertyInterface[];
  images_list: ImageInterface[];
  youtube_links_list: YoutubeLinkInterface[];
  bookings_list: VenueBookingInterface[];
}

function VenuePage(props: Props) {
  const id: number = props.match.params.id;
  let host: string = '';
  if (process.env.REACT_APP_API_HOST) {
    host = process.env.REACT_APP_API_HOST;
  }
  const url: string = `${host}/venues/${id}`;
  const {error, loading, results: result} = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  const venue: Venue = result;
  const upcoming = venue.bookings_list.filter((booking: VenueBookingInterface) => {
    return new Date(booking.date) > new Date();
  });
  const previous = venue.bookings_list.filter((booking: VenueBookingInterface) => {
    return new Date(booking.date) < new Date();
  });

  return (
    <div>
      <Header page='home' />
      <h2>{venue.name}</h2>
      <img src={venue.image} alt='selected' />
      <div>Location: {venue.location}</div>
      <div>
        Phone: <a href={`tel:${venue.phone}`}>{venue.phone}</a>
      </div>
      <div>Properties: {venue.properties_list.map(p => p.name).join(', ')}</div>
      <div>Website: {venue.website}</div>
      {venue.youtube_links_list.map((yt: YoutubeLinkInterface) => {
        return (
          <iframe
            title={yt.link}
            key={yt.link}
            width='560'
            height='315'
            src={yt.link}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope;'
            allowFullScreen
          />
        );
      })}
      <div>
        {venue.images_list.map(img => (
          <img width='150' src={img.image} key={img.image} alt={img.image} />
        ))}
      </div>
      {previous.length > 0 && (
        <div>
          Previous:
          {previous.map((b: VenueBookingInterface) => (
            <div key={`prev-${b.date}`}>
              Hosted
              <Link to={`/performers/${b.performer_id}`}>
                {b.performer_name}
              </Link>{' '}
              on {b.date}
            </div>
          ))}
        </div>
      )}
      {upcoming.length > 0 && (
        <div>
          Upcoming:
          {upcoming.map((b: VenueBookingInterface) => (
            <div key={`upcoming-${b.date}`}>
              Will host
              <Link to={`/performers/${b.performer_id}`}>
                {b.performer_name}
              </Link>{' '}
              on {b.date}
            </div>
          ))}
        </div>
      )}
      <div>Rating: {venue.rating}</div>
    </div>
  );
}

export default VenuePage;
