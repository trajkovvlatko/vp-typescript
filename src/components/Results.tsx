import React from 'react';
import ResultItem from './ResultItem';
import { useFetch } from '../hooks/useFetch';
import ResultInterface from '../interfaces/ResultInterface';
import FiltersInterface from '../interfaces/FiltersInterface';

interface Props {
  filters: FiltersInterface;
}

function Results(props: Props) {
  const filters = props.filters;
  const host = process.env.REACT_APP_API_HOST;
  let paramsList: string[] = [];

  if (filters.date) {
    paramsList.push(`date=${filters.date}`);
  }
  if (filters.type === 'performer' && filters.ids && filters.ids.length > 0) {
    paramsList.push(`genres=${filters.ids.join(',')}`);
  }
  if (filters.type === 'venue' && filters.ids && filters.ids.length > 0) {
    paramsList.push(`properties=${filters.ids.join(',')}`);
  }
  const params: string = paramsList.join('&');
  const url: string = `${host}/search/${filters.type}s/${
    filters.location
  }?${params}`;
  const { error, loading, results } = useFetch(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <div>
      <h3>Results</h3>
      <div className="results">
        {results.map((row: ResultInterface) => (
          <ResultItem
            data={row}
            type={filters.type}
            key={`result-item-${row.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;
