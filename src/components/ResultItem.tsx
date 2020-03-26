import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom';
import ResultInterface from 'interfaces/ResultInterface';

interface Props {
  data: ResultInterface;
  type: string;
}

function ResultItem(props: Props) {
  const {id, name, image, rating} = props.data;

  return (
    <div className='result-item'>
      <img src={image} width='100' alt={name} />
      <p>{name}</p>
      <Rating stars={parseInt(rating)} />
      <Link to={`/${props.type}s/${id}`}>Book</Link>
    </div>
  );
}

export default ResultItem;
