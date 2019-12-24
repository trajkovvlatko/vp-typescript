import React from 'react';
import PromoItem from './PromoItem';
import { useFetch } from '../hooks/useFetch';
import PromoItemInterface from '../interfaces/PromoItemInterface';

interface Props {
  title: string;
  sorting: string;
  type: string;
}

function PromoList(props: Props) {
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/${props.type}s?sorting=${props.sorting}&limit=3`;
  const { error, loading, results } = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div className="promo-list">
      <h5>{props.title}</h5>
      {results.map((row: PromoItemInterface) => (
        <PromoItem data={row} key={`promo-item-${row.id}`} />
      ))}
    </div>
  );
}

export default PromoList;
