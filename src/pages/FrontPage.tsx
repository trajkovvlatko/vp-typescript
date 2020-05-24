import React from 'react';
import BasicSearch from 'components/BasicSearch';
import PromoList from 'components/PromoList';

import '../styles/pages/FrontPage.scss';

function FrontPage() {
  return (
    <div className='front-page'>
      <div className='top-container'>
        <div>
          <h1>Lorem ipsum dolor sit</h1>
          <BasicSearch />
        </div>
        <div>
          <img src='/images/poster.png' alt='poster' />
        </div>
      </div>

      <div className='promo-lists'>
        <PromoList
          title='Latest performers'
          sorting='latest'
          type='performer'
        />
        <PromoList title='Latest venues' sorting='latest' type='venue' />
      </div>
    </div>
  );
}

export default FrontPage;
