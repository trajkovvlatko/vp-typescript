import React from 'react';
import {Link} from 'react-router-dom';

import Rating from '../../Rating';

import {
  LocalBarOutlined,
  LocationOnOutlined,
  PanoramaOutlined,
} from '@material-ui/icons';

interface Props {
  data: {
    id: number;
    name: string;
    imageUrl: string;
    rating: number;
    location: string;
    address: string;
  };
}

function UserVenueCard(props: Props) {
  const {id, name, imageUrl, rating, location, address} = props.data;

  return (
    <li className='col-4 venue-card'>
      <h3 className='col-12 black title'>
        <LocalBarOutlined />
        <Link to={`/venues/${id}`}>{name}</Link>
      </h3>

      <div className='row clear-both'>
        <Link to={`/venues/${id}`} className='col-4 image-link'>
          {(imageUrl && <img src={imageUrl} alt={name} />) || (
            <PanoramaOutlined />
          )}
        </Link>
        <div className='col-8 info'>
          <div>
            <Rating stars={rating} />
          </div>
          <div>
            <div>
              <LocationOnOutlined />
              <span>{address}</span>
            </div>
            <div>{location}</div>
          </div>
        </div>
      </div>

      <Link to={`/user/venues/${id}/edit`} className='edit'>
        Edit
      </Link>
    </li>
  );
}

export default UserVenueCard;
