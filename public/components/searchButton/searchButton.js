import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './searchButtonStyles';
import { searchQueryStart } from '../../actions/';

const SearchButton = ({ dispatch, searchType, searchText }) => {
    const searchByQyery = () => {
        dispatch(searchQueryStart(searchText, searchType));
    };

    return (
        <Link to={`/search/${searchText}`} className="search-button" onClick={searchByQyery}>Search</Link>
    );
};

SearchButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchType: PropTypes.string.isRequired,
    searchText: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        searchType: state.search.searchType,
        searchText: state.search.inputValue
    };
};

export default connect(mapStateToProps)(SearchButton);
