import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Props {
  match: {
    params: {
      id: number;
    };
  };
}

interface Booking {
  date: Date;
  venue_id: number;
  venue_name: string;
}

interface Genre {
  name: string;
}

interface YoutubeLink {
  link: string;
}

interface Image {
  image: string;
}

interface Performer {
  name: string;
  image: string;
  location: string;
  phone: string;
  bookings_list: Booking[];
  genres_list: Genre[];
  website: string;
  youtube_links_list: YoutubeLink[];
  images_list: Image[];
  rating: number;
}

function PerformerPage(props: Props) {
  const id: number = props.match.params.id;
  let host: string = '';
  if (process.env.REACT_APP_API_HOST) {
    host = process.env.REACT_APP_API_HOST;
  }
  const url: string = `${host}/performers/${id}`;
  const { error, loading, results: result } = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  const performer: Performer = result;
  const upcoming = performer.bookings_list.filter((booking: Booking) => {
    return new Date(booking.date) > new Date();
  });
  const previous = performer.bookings_list.filter((booking: Booking) => {
    return new Date(booking.date) < new Date();
  });

  return (
    <div>
      <Header page="home" />
      <h2>{performer.name}</h2>
      <img src={performer.image} alt="selected" />
      <div>Location: {performer.location}</div>
      <div>
        Phone: <a href={`tel:${performer.phone}`}>{performer.phone}</a>
      </div>
      <div>
        Genres:{' '}
        {performer.genres_list.map((genre: Genre) => genre.name).join(', ')}
      </div>
      <div>Website: {performer.website}</div>
      {performer.youtube_links_list.map((yt: { link: string }) => {
        return (
          <iframe
            title={yt.link}
            key={yt.link}
            width="560"
            height="315"
            src={yt.link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowFullScreen
          />
        );
      })}
      <div>
        {performer.images_list.map((img: { image: string }) => (
          <img width="150" src={img.image} key={img.image} alt={img.image} />
        ))}
      </div>
      {previous.length > 0 && (
        <div>
          Previous:
          {previous.map((b: Booking) => (
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
          {upcoming.map((b: Booking) => (
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
