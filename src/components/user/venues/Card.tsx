import React from 'react';
import {Link} from 'react-router-dom';

import {MicNoneOutlined} from '@material-ui/icons';

interface Props {
  data: {
    id: number;
    name: string;
  };
}

function UserVenueCard(props: Props) {
  const {id, name} = props.data;

  return (
    <li className='col-4 performer-card'>
      <h3 className='col-12 black'>
        <MicNoneOutlined />
        <Link to={`/performers/${id}`}>{name}</Link>
      </h3>

      <div className='row clear-both'>
        <img src='' alt='img' className='col-3' />
        <div className='col-9'>
          <div>Rating</div>
          <div>Location</div>
        </div>
      </div>

      <Link to={`/user/venues/${id}/edit`} className='edit'>
        Edit
      </Link>
    </li>
  );
}

export default UserVenueCard;
