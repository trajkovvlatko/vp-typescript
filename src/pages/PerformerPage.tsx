import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';

import BookSelector from 'components/BookSelector';
import Rating from 'components/Rating';
import ImageGallery from 'components/ui/ImageGallery';
import Iframe from 'components/ui/Iframe';

import GenreInterface from 'interfaces/GenreInterface';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';
import BookingItemInterface from 'interfaces/BookingItemInterface';

import UserContext from 'contexts/UserContext';

import {toTitleCase} from '../helpers/main';

import '../styles/pages/PerformerPage.scss';

type TParams = {id: string};

interface Performer {
  id: number;
  name: string;
  email: string;
  details: string;
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

  return (
    <div className='row performer'>
      <div className='col-8'>
        <ImageGallery images={performer.Images} />

        <div className='clear-both'></div>

        <h5 className='col-12'>About the performer</h5>

        <div className='col-12 details'>{performer.details}</div>

        <h5 className='col-12'>Videos</h5>

        <div className='clear-both videos'>
          {performer.YoutubeLinks.map((yt: YoutubeLinkInterface) => {
            return (
              <div className='col-4' key={`div-${yt.link}`}>
                <Iframe src={yt.link} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='col-4'>
        <div className='meta'>
          <h1>{performer.name}</h1>

          <Rating stars={performer.rating} />

          <div>
            {bookingsCount} {(bookingsCount > 1 && 'bookings') || 'booking'} so
            far
          </div>

          <div>{toTitleCase(performer.location)}</div>
          <br />

          <div>
            <Link to={performer.website} target='_blank'>
              {performer.website}
            </Link>
          </div>

          <div>
            <Link to={`tel:${performer.phone}`}>{performer.phone}</Link>
          </div>

          <div>
            <a href={`mailto:${performer.email}`}>{performer.email}</a>
          </div>

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
