import React from 'react';
import loading from './spinning-bubbles.svg';

const Select = ({ value, isLoading, children, handleChange }) => (
  <div className="search">
    <input value={value} onChange={handleChange} placeholder="Search..." />
    {isLoading && <img className="loading" src={loading} alt="Loading icon" />}
    {children}
  </div>
);

export default Select;
