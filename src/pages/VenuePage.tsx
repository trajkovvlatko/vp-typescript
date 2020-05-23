import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {useFetch} from 'hooks/useFetch';
import {Link} from 'react-router-dom';
import YoutubeLinkInterface from 'interfaces/YoutubeLinkInterface';
import ImageInterface from 'interfaces/ImageInterface';
import PropertyInterface from 'interfaces/PropertyInterface';
import BookSelector from 'components/BookSelector';
import UserContext from 'contexts/UserContext';
import BookingItemInterface from 'interfaces/BookingItemInterface';

type TParams = {id: string};

interface Venue {
  id: number;
  name: string;
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
  const image = venue.Images.filter((i) => i.selected)[0].imageUrl;

  return (
    <div>
      {user.token ? (
        <div>
          {showBookSelector ? (
            <BookSelector connectType='venue' connectId={venue.id} />
          ) : (
            <button onClick={onShowBookSelectorClick}>Book this venue</button>
          )}
        </div>
      ) : (
        <Link to='/login'>Book</Link>
      )}

      <h2>{venue.name}</h2>
      <img src={image} alt={image} />
      <div>Location: {venue.location}</div>
      <div>
        Phone: <a href={`tel:${venue.phone}`}>{venue.phone}</a>
      </div>
      <div>Properties: {venue.Properties.map((p) => p.name).join(', ')}</div>
      <div>Website: {venue.website}</div>
      {venue.YoutubeLinks.map((yt: YoutubeLinkInterface) => {
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
        {venue.Images.map((img) => (
          <img
            width='150'
            src={img.imageUrl}
            key={img.imageUrl}
            alt={img.imageUrl}
          />
        ))}
      </div>
      <div>
        {bookingsCount} {(bookingsCount > 1 && 'bookings') || 'booking'} so far
      </div>
      <div>Rating: {venue.rating}</div>
    </div>
  );
}

export default VenuePage;
