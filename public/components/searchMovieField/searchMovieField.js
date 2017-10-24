import React, { Component } from 'react';
import './searchMovieFieldStyles';
import SearchButton from '../searchButton/searchButton';
import SearchTypeToggle from '../searchTypeToggle/searchTypeToggle';
import SearchInput from '../searchInput/searchInput';

export default class SearchMovieField extends Component {
    render() {
        return (
            <div className="search-movie-field">
                <SearchInput />
                <div className="search-movie-field__button-container">
                    <SearchTypeToggle />
                    <SearchButton />
                </div>
            </div>
        );
    }
}
