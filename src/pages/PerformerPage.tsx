import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import Header from 'components/Header';
import BookSelector from 'components/BookSelector';

import GenreInterface from 'interfaces/GenreInterface';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';
import UserContext from 'contexts/UserContext';
import BookingItemInterface from 'interfaces/BookingItemInterface';

type TParams = {id: string};

interface Performer {
  id: number;
  name: string;
  image: string;
  location: string;
  phone: string;
  website: string;
  rating: number;
  Genres: GenreInterface[];
  Images: ImageInterface[];
  YoutubeLinks: YoutubeLinkInterface[];
  Bookings: BookingItemInterface[];
}

function PerformerPage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  let host = '';
  if (process.env.REACT_APP_API_HOST) {
    host = process.env.REACT_APP_API_HOST;
  }
  const url: string = `${host}/performers/${id}`;
  const {error, loading, results: result} = useFetch(url);
  const {user} = React.useContext(UserContext);
  const [showBookSelector, updateShowBookSelector] = useState<Boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  const performer: Performer = result;
  function onShowBookSelectorClick() {
    updateShowBookSelector(true);
  }

  const bookingsCount = performer.Bookings.length;
  const image = performer.Images.filter((i) => i.selected)[0].image;

  return (
    <div>
      <Header page='home' />
      <h2>{performer.name}</h2>

      {user.token ? (
        <div>
          {showBookSelector ? (
            <BookSelector connectType='performer' connectId={performer.id} />
          ) : (
            <button onClick={onShowBookSelectorClick}>
              Book this performer
            </button>
          )}
        </div>
      ) : (
        <Link to='/login'>Book</Link>
      )}

      <img src={image} alt={image} />
      <div>Location: {performer.location}</div>
      <div>
        Phone: <a href={`tel:${performer.phone}`}>{performer.phone}</a>
      </div>
      <div>
        Genres:{' '}
        {performer.Genres.map((genre: GenreInterface) => genre.name).join(', ')}
      </div>
      <div>Website: {performer.website}</div>
      {performer.YoutubeLinks.map((yt: YoutubeLinkInterface) => {
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
        {performer.Images.map((img: {image: string}) => (
          <img width='150' src={img.image} key={img.image} alt={img.image} />
        ))}
      </div>
      <div>
        {bookingsCount} {(bookingsCount > 1 && 'bookings') || 'booking'} so far
      </div>
      <div>Rating: {performer.rating}</div>
    </div>
  );
}

export default PerformerPage;
