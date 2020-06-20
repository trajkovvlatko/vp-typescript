import React from 'react';
import {Link} from 'react-router-dom';

import Rating from '../../Rating';

import {MicNoneOutlined} from '@material-ui/icons';

interface Props {
  data: {
    id: number;
    name: string;
    imageUrl: string;
    rating: number;
    location: string;
  };
}

function UserVenueCard(props: Props) {
  const {id, name, imageUrl, rating, location} = props.data;

  return (
    <li className='col-4 performer-card'>
      <h3 className='col-12 black'>
        <MicNoneOutlined />
        <Link to={`/performers/${id}`}>{name}</Link>
      </h3>

      <div className='row clear-both'>
        <img src={imageUrl} alt='img' className='col-3' />
        <div className='col-9'>
          <div>
            <Rating stars={rating} />
          </div>
          <div>{location}</div>
        </div>
      </div>

      <Link to={`/user/venues/${id}/edit`} className='edit'>
        Edit
      </Link>
    </li>
  );
}

export default UserVenueCard;
