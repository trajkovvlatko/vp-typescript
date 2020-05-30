import React from 'react';
import SimpleHeader from './Simple';
import FullHeader from './Full';
import {useLocation} from 'react-router-dom';

function Switch() {
  const currentPage = useLocation().pathname;
  const isAuthPage = currentPage === '/login' || currentPage === '/register';
  return (
    <div className='header'>
      {(isAuthPage && <SimpleHeader />) || <FullHeader />}
    </div>
  );
}

export default Switch;
