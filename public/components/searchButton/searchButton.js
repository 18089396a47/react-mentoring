import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './searchButtonStyles';

const SearchButton = ({ searchText }) => (
    <Link to={`/search/${searchText}`} className="search-button">Search</Link>
);

SearchButton.propTypes = {
    searchText: PropTypes.string
};

export default SearchButton;
