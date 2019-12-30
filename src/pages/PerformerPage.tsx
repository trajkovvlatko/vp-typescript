import React from 'react';
import {useFetch} from '../hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import GenreInterface from '../interfaces/GenreInterface';
import YoutubeLinkInterface from '../interfaces/YoutubeLinkInterface';
import ImageInterface from '../interfaces/ImageInterface';
import {PerformerBookingInterface} from '../interfaces/BookingInterface';

interface Props {
  match: {
    params: {
      id: number;
    };
  };
}

interface Performer {
  name: string;
  image: string;
  location: string;
  phone: string;
  website: string;
  rating: number;
  genres_list: GenreInterface[];
  images_list: ImageInterface[];
  youtube_links_list: YoutubeLinkInterface[];
  bookings_list: PerformerBookingInterface[];
}

function PerformerPage(props: Props) {
  const id: number = props.match.params.id;
  let host: string = '';
  if (process.env.REACT_APP_API_HOST) {
    host = process.env.REACT_APP_API_HOST;
  }
  const url: string = `${host}/performers/${id}`;
  const {error, loading, results: result} = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  const performer: Performer = result;
  const upcoming = performer.bookings_list.filter(
    (booking: PerformerBookingInterface) => {
      return new Date(booking.date) > new Date();
    }
  );
  const previous = performer.bookings_list.filter(
    (booking: PerformerBookingInterface) => {
      return new Date(booking.date) < new Date();
    }
  );

  return (
    <div>
      <Header page='home' />
      <h2>{performer.name}</h2>
      <img src={performer.image} alt='selected' />
      <div>Location: {performer.location}</div>
      <div>
        Phone: <a href={`tel:${performer.phone}`}>{performer.phone}</a>
      </div>
      <div>
        Genres:{' '}
        {performer.genres_list
          .map((genre: GenreInterface) => genre.name)
          .join(', ')}
      </div>
      <div>Website: {performer.website}</div>
      {performer.youtube_links_list.map((yt: YoutubeLinkInterface) => {
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
        {performer.images_list.map((img: {image: string}) => (
          <img width='150' src={img.image} key={img.image} alt={img.image} />
        ))}
      </div>
      {previous.length > 0 && (
        <div>
          Previous:
          {previous.map((b: PerformerBookingInterface) => (
            <div key={`prev-${b.date}`}>
              Performed at:{' '}
              <Link to={`/venues/${b.venue_id}`}>{b.venue_name}</Link> on{' '}
              {b.date}
            </div>
          ))}
        </div>
      )}
      {upcoming.length > 0 && (
        <div>
          Upcoming:
          {upcoming.map((b: PerformerBookingInterface) => (
            <div key={`upcoming-${b.date}`}>
              Will perform at:{' '}
              <Link to={`/venues/${b.venue_id}`}>{b.venue_name}</Link> on{' '}
              {b.date}
            </div>
          ))}
        </div>
      )}
      <div>Rating: {performer.rating}</div>
    </div>
  );
}

export default PerformerPage;
