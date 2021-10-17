import React from 'react';

import './NothingToShow.scss';

const NothingToShow = ({ message, src, alt, className = '', children }) => (
  <div className={`nothing-to-show ${className}`}>
    <img src={src} alt={alt}/>
    <p className='nothing-to-show-message'>{ message }</p>
    { children }
  </div>
);
 
export default NothingToShow;
