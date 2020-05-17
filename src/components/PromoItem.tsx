import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import PromoItemInterface from 'interfaces/PromoItemInterface';

interface Props {
  data: PromoItemInterface;
}

function PromoItem(props: Props) {
  const {id, name, imageUrl, rating, type} = props.data;
  return (
    <div className='promo-item'>
      <img src={imageUrl} width='100' alt={name} />
      <p>{name}</p>
      <Rating stars={parseInt(rating)} />
      <Link to={`/${type}s/${id}`}>Book</Link>
    </div>
  );
}

export default PromoItem;
