import React, { Component } from 'react';
import './searchMovieWrapperStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';

export default class PageHeader extends Component {
    render() {
        return (
            <div className="search-movie-wrapper">
                <h2 className="search-movie-wrapper__title">Find your movie</h2>
                <SearchMovieField />
            </div>
        );
    }
}
