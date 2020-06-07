import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Filters from 'components/Filters';
import Results from 'components/Results';
import {withRouter} from 'react-router-dom';

import '../styles/pages/SearchPage.scss';

interface Filters {
  type: string;
  location: string;
  date: string;
  ids: any; // TODO: Fix these anys
}

let filters: Filters;

function SearchPage() {
  const history = useHistory();
  const {type, location, date, ids} = useParams();
  filters = {
    type: type,
    location: location,
    date: date,
    ids: ids ? ids.split(',') : [],
  };

  function search(data: {}) {
    // TODO
    filters = {...filters, ...data};
    history.push(
      `/search/${filters.type}/${filters.location}/${filters.ids.join(',')}`
    );
  }

  return (
    <div className='row'>
      <div className='col col-2 search-sidebar'>
        <Filters filters={filters} onChange={search} />
      </div>
      <div className='col col-10 search-results'>
        <Results filters={filters} />
      </div>
    </div>
  );
}

export default withRouter(SearchPage);
