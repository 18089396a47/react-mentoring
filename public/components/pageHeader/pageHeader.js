import React, { Component } from 'react';
import './pageHeaderStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';

export default class PageHeader extends Component {
    render() {
        return (
            <header className="page-header">
                <a href="/" className="page-header__link">netflixroulette</a> {/*replace when router*/}
                <h2 className="page-header__title">Find your movie</h2>
                <SearchMovieField />
            </header>
        );
    }
}
