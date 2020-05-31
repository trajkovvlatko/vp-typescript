import React from 'react';
import ResultItem from './ResultItem';
import {useFetch} from 'hooks/useFetch';
import ResultInterface from 'interfaces/ResultInterface';

interface Props {
  title: string;
  sorting: string;
  type: string;
}

function PromoList(props: Props) {
  const host = process.env.REACT_APP_API_HOST;
  const url = `${host}/${props.type}s?sorting=${props.sorting}&limit=3`;
  const {error, loading, results} = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div className='promo-list'>
      <h1>{props.title}</h1>
      <div className='promo-items row'>
        {results.map((row: ResultInterface) => (
          <ResultItem
            data={row}
            sizeClass='col-4'
            key={`promo-item-${row.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default PromoList;
