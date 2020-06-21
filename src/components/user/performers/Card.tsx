import React from 'react';
import {Link} from 'react-router-dom';

import Rating from '../../Rating';

import CardInterface from 'interfaces/CardInterface';

import {MicNoneOutlined} from '@material-ui/icons';

interface Props {
  data: CardInterface;
}

function UserPerformerCard(props: Props) {
  const {id, name, imageUrl, rating, location} = props.data;

  return (
    <li className='col-4 performer-card'>
      <h3 className='col-12 black title'>
        <MicNoneOutlined />
        <Link to={`/performers/${id}`}>{name}</Link>
      </h3>

      <div className='row clear-both'>
        <Link to={`/performers/${id}`} className='col-4'>
          <img src={imageUrl} alt='Missing image' />
        </Link>
        <div className='col-8 info'>
          <div>
            <Rating stars={rating} />
          </div>
          <div>{location}</div>
        </div>
      </div>

      <Link to={`/user/performers/${id}/edit`} className='edit'>
        Edit
      </Link>
    </li>
  );
}

export default UserPerformerCard;
