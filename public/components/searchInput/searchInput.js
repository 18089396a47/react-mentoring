import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import './searchInputStyles.styl';
import { searchQueryStart, changeSearchInput } from '../../actions/';

export const SearchInput = ({ dispatch, searchType, inputValue, history }) => {
    function searchFilm(event) {
        event.preventDefault();

        history.push(`/search/${inputValue}`);
        dispatch(searchQueryStart(inputValue, searchType));
    }

    function changeInputValue(event) {
        const value = event.target.value;

        dispatch(changeSearchInput(value));
    }

    return (
        <form className="search-input" onSubmit={searchFilm}>
            <input
                onChange={changeInputValue}
                value={inputValue}
                className="search-input__field"
                placeholder="Enter something..."
            />
            <div className="search-input__icon" onClick={searchFilm}></div>
        </form>
    );
};

SearchInput.propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchType: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    history: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        searchType: state.search.searchType,
        inputValue: state.search.inputValue
    };
};

export default withRouter(connect(mapStateToProps)(SearchInput));
