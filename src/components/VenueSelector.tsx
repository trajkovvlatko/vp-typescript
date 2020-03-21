import React from 'react';
import {useFetch} from 'hooks/useFetch';
import VenueSelectorItem from 'components/VenueSelectorItem';
const host = process.env.REACT_APP_API_HOST;

interface Props {
  performerId: number;
}

function VenueSelector(props: Props) {
  const url: string = `${host}/own_venues`;
  const {error, loading, results} = useFetch(url);

  console.log(error);
  if (error) {
    return <div>Error while fetching data.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {results.map((row: {id: number; name: string}) => (
          <VenueSelectorItem
            performerId={row.id}
            key={`venue-selector-item-${row.id}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default VenueSelector;
