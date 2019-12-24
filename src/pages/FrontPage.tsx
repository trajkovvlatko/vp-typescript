import React from 'react';
import BasicSearch from '../components/BasicSearch';
import PromoList from '../components/PromoList';
import Header from '../components/Header';

function FrontPage() {
  return (
    <div>
      <Header page='home' />
      <h1>Front Page</h1>
      <BasicSearch />
      <div className='promo-lists'>
        <h2>Promo lists</h2>
        <PromoList
          title='Latest performers'
          sorting='latest'
          type='performer'
        />
        <PromoList title='Latest venues' sorting='latest' type='venue' />
        <PromoList
          title='Trending performers'
          sorting='trending'
          type='performer'
        />
        <PromoList title='Trending venues' sorting='trending' type='venue' />
      </div>
    </div>
  );
}

export default FrontPage;
