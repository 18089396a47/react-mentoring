import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theMovieDb from 'themoviedb-javascript-library';
import './searchInputStyles';
import { search } from '../../actions/';

const SearchInput = ({ dispatch }) => {
    let input;

    function searchFilm(event) {
        event.preventDefault();
        const value = input.value.trim();
        
        if (value) {
            dispatch(search(value));
            input.value = '';
        }
    }

    return (
        <form className="search-input" onSubmit={searchFilm}>
            <input
                ref={node => { input = node; }}
                className="search-input__field"
                placeholder="Enter something..."
            />
            <div className="search-input__icon" onClick={searchFilm}></div>
        </form>
    );
};

SearchInput.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(SearchInput);
