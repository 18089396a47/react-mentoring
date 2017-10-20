import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './searchButtonStyles';

const SearchButton = ({ dispatch, searchText }) => {
    return (
        <Link to={`/search/${searchText}`} className="search-button">Search</Link>
    );
};

SearchButton.propTypes = {
    searchText: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        searchText: state.search.inputValue
    };
};

export default connect(mapStateToProps)(SearchButton);
