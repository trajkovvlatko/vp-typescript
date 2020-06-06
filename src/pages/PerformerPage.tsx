import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import BookSelector from 'components/BookSelector';
import Rating from 'components/Rating';

import GenreInterface from 'interfaces/GenreInterface';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';
import UserContext from 'contexts/UserContext';
import BookingItemInterface from 'interfaces/BookingItemInterface';

import '../styles/pages/PerformerPage.scss';

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

const toTitleCase = (term: string) => {
  return term.charAt(0).toUpperCase() + term.slice(1);
};

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
  const image = performer.Images.filter((i) => i.selected)[0].imageUrl;

  return (
    <div className='row performer'>
      <div className='col-8'>
        <img src={image} alt={image} />
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
          {performer.Images.map((img: ImageInterface) => (
            <img
              width='150'
              src={img.imageUrl}
              key={`performer-image-${img.id}`}
              alt={img.imageUrl}
            />
          ))}
        </div>
        <div>
          {bookingsCount} {(bookingsCount > 1 && 'bookings') || 'booking'} so
          far
        </div>
      </div>
      <div className='col-4'>
        <div className='meta'>
          <h1>{performer.name}</h1>
          <Rating stars={performer.rating} />
          <div>Location: {toTitleCase(performer.location)}</div>
          <br />
          <div>
            <Link to={performer.website} target='_blank'>
              {performer.website}
            </Link>
          </div>
          <div>
            <Link to={`tel:${performer.phone}`}>{performer.phone}</Link>
          </div>

          <div>Add Email Here</div>

          <br />

          <div className='genres-list'>
            <ul>
              {performer.Genres.map((genre: GenreInterface) => {
                return <li key={`genre-id-${genre.id}`}>{genre.name}</li>;
              })}
            </ul>
          </div>

          <div className='clear-both booking-form center'>
            {user.token ? (
              <div>
                {showBookSelector ? (
                  <BookSelector
                    connectType='performer'
                    connectId={performer.id}
                  />
                ) : (
                  <button
                    className='nav-link primary'
                    onClick={onShowBookSelectorClick}
                  >
                    Book now
                  </button>
                )}
              </div>
            ) : (
              <Link to='/login'>Book</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformerPage;
