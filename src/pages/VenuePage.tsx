import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';

import Rating from 'components/Rating';
import BookSelector from 'components/BookSelector';
import ImageGallery from 'components/ui/ImageGallery';
import Iframe from 'components/ui/Iframe';

import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';
import PropertyInterface from 'interfaces/PropertyInterface';
import BookingItemInterface from 'interfaces/BookingItemInterface';

import UserContext from 'contexts/UserContext';

import {toTitleCase} from '../helpers/main';

import '../styles/pages/PerformerPage.scss';

type TParams = {id: string};

interface Venue {
  id: number;
  name: string;
  details: string;
  image: string;
  location: string;
  phone: string;
  website: string;
  rating: number;
  Properties: PropertyInterface[];
  Images: ImageInterface[];
  YoutubeLinks: YoutubeLinkInterface[];
  Bookings: BookingItemInterface[];
}

function VenuePage({match}: RouteComponentProps<TParams>) {
  const id = parseInt(match.params.id);
  const {user} = React.useContext(UserContext);
  let host = '';
  if (process.env.REACT_APP_API_HOST) {
    host = process.env.REACT_APP_API_HOST;
  }
  const url: string = `${host}/venues/${id}`;
  const {error, loading, results: result} = useFetch(url);
  const [showBookSelector, updateShowBookSelector] = useState<Boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error while fetching data.</div>;

  const venue: Venue = result;

  function onShowBookSelectorClick() {
    updateShowBookSelector(true);
  }

  const bookingsCount = venue.Bookings.length;

  return (
    <div className='row venue'>
      <div className='col-8'>
        <ImageGallery images={venue.Images} />

        <div className='clear-both'></div>

        <h5 className='col-12'>About the venue</h5>

        <div className='col-12 details'>{venue.details}</div>

        <h5 className='col-12'>Videos</h5>

        <div className='clear-both videos'>
          {venue.YoutubeLinks.map((yt: YoutubeLinkInterface) => {
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
          <h1>{venue.name}</h1>

          <Rating stars={venue.rating} />

          <div>
            {bookingsCount} {(bookingsCount > 1 && 'bookings') || 'booking'} so
            far
          </div>

          <div>{toTitleCase(venue.location)}</div>
          <br />

          <div>
            <Link to={venue.website} target='_blank'>
              {venue.website}
            </Link>
          </div>

          <div>
            <Link to={`tel:${venue.phone}`}>{venue.phone}</Link>
          </div>

          <div>Add Email Here</div>

          <br />

          <div className='genres-list'>
            <ul>
              {venue.Properties.map((property: PropertyInterface) => {
                return (
                  <li key={`property-id-${property.id}`}>{property.name}</li>
                );
              })}
            </ul>
          </div>

          <div className='clear-both booking-form center'>
            {user.token ? (
              <div>
                {showBookSelector ? (
                  <BookSelector connectType='venue' connectId={venue.id} />
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

export default VenuePage;
