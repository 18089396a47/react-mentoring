import React, { Component } from 'react';
import './filmsContainerStyles';
import FilmItem from '../filmItem/filmItem';

export default class FilmsContainer extends Component {
    constructor() {
        super();
        this.state = {
            films: [{
                show_id: 60031236,
                show_title: 'KILL BILL: VOL. 1',
                release_year: '2003',
                category: 'Action & Adventure',
                poster: 'http://netflixroulette.net/api/posters/60031236.jpg'
            }]
        };
    }

    getFilmsList() {
        return this.state.films.map((film) => (
            <FilmItem
                show_title={film.show_title}
                release_year={film.release_year}
                category={film.category}
                poster={film.poster}
                key={film.show_id}
            />
        ));
    }

    render() {
        return (
            <ul className="films-container">
                {this.state.films && this.state.films.length ?
                    this.getFilmsList()
                    :
                    <div className="films-container__no-films-found">No films found</div>
                }
            </ul>
        );
    }
}
