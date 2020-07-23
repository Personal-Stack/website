import React from 'react';
import { Link } from 'gatsby';
import './logo.scss';

export function Logo() {
  return (
    <Link className='app__logo' to={'/'}>
      <h1>
        <b>BB</b>
      </h1>
    </Link>
  );
}
