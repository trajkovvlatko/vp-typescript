import React from 'react';
import BasicSearch from 'components/BasicSearch';
import PromoList from 'components/PromoList';

function FrontPage() {
  return (
    <div>
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
        <PromoList title='Top performers' sorting='top' type='performer' />
        <PromoList title='Top venues' sorting='top' type='venue' />
      </div>
    </div>
  );
}

export default FrontPage;
