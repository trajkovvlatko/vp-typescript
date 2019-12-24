import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  page: string; // ex. login
  label: string; // Login here
  currentPage: string; // current page in the url, ex. login
}

function NavLink(props: Props) {
  return (
    <div>
      {props.currentPage === props.page ? (
        props.label
      ) : (
        <Link to={`/${props.page}`}>{props.label}</Link>
      )}
    </div>
  );
}

export default NavLink;
