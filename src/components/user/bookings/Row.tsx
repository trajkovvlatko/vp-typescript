import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: number;
  name: string;
  image: string;
  type: string;
}

function BookingRow(props: Props) {
  const {id, name, image, type} = props;
  return (
    <div>
      <Link to={`/${type}s/${id}`} className='col-3 img'>
        <img src={image} alt='' />
      </Link>
      <Link to={`/${type}s/${id}`} className='col-9'>
        {name}
      </Link>
    </div>
  );
}

export default BookingRow;
