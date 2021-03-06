import React from 'react';
import {useFetch} from 'hooks/useFetch';
import UserContext from 'contexts/UserContext';

import UserPerformerCard from './performers/Card';
import UserVenueCard from './venues/Card';

import '../../styles/components/user/List.scss';

import VenueCardInterface from 'interfaces/CardInterface';
type PerformerCardInterface = Omit<VenueCardInterface, 'address'>;

interface Props {
  type: string;
}

function List(props: Props) {
  const type = props.type;
  const host = process.env.REACT_APP_API_HOST;
  const {user} = React.useContext(UserContext);

  const url = `${host}/user/${type}s`;
  const {error, loading, results} = useFetch(url, user.token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error while fetching data.</div>;
  }

  return (
    <ul className={`${type}s-list row`}>
      {results.map((row: PerformerCardInterface & VenueCardInterface) => {
        return (
          (type === 'performer' && (
            <UserPerformerCard key={`performer-card-${row.id}`} data={row} />
          )) || <UserVenueCard key={`venue-card-${row.id}`} data={row} />
        );
      })}
    </ul>
  );
}

export default List;
