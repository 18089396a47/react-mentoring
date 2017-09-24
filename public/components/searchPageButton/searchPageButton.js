import React from 'react';
import { Link } from 'react-router-dom';
import './searchPageButtonStyles';

const SearchPageButton = () => (
    <Link to="/search" className="search-page-button" >Search</Link>
);

export default SearchPageButton;
