import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import ResultInterface from 'interfaces/ResultInterface';

import '../styles/components/ResultItem.scss';

interface Props {
  data: ResultInterface;
  sizeClass: string;
}

function ResultItem(props: Props) {
  const {id, name, imageUrl, rating, type} = props.data;

  return (
    <Link
      to={`/${type}s/${id}`}
      className={`col ${props.sizeClass} result-item`}
    >
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <Rating stars={parseInt(rating)} />
      <button className='nav-link primary small'>Book</button>
    </Link>
  );
}

export default ResultItem;
