import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './searchInputStyles';
import { searchStart, changeSearchInput } from '../../actions/';

const SearchInput = ({ dispatch, inputValue }) => {
    function searchFilm(event) {
        event.preventDefault();

        if (inputValue) {
            dispatch(searchStart(inputValue));
        }
    }

    function keyDown(event) {
        const value = event.target.value;

        dispatch(changeSearchInput(value));
    }

    return (
        <form className="search-input" onSubmit={searchFilm}>
            <input
                onChange={keyDown}
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
    inputValue: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    inputValue: state.search.inputValue
  };
};

export default connect(mapStateToProps)(SearchInput);
