import React from 'react';
import Filters from '../components/Filters';
import Results from '../components/Results';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';

interface Filters {
  type: string;
  location: string;
  date: string;
  ids: any; // TODO: Fix these anys
}

interface Props {
  match: {
    params: Filters;
  };
  history: {
    push: (path: string) => void;
  };
}

let filters: Filters;

function SearchPage(props: Props) {
  const { type, location, date, ids } = props.match.params;
  filters = {
    type: type,
    location: location,
    date: date,
    ids: ids ? ids.split(',') : [],
  };

  function search(data: {}) {
    // TODO
    filters = { ...filters, ...data };
    props.history.push(
      `/search/${filters.type}/${filters.location}/${filters.ids.join(',')}`
    );
  }

  return (
    <div>
      <Header page="home" />
      <h1>Search Page</h1>
      <div>
        <Filters filters={filters} onChange={search} />
      </div>
      -----------------
      <Results filters={filters} />
    </div>
  );
}

export default withRouter(SearchPage);
