import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './filmsContainerStyles';
import FilmItem from '../filmItem/filmItem';
import theMovieDb from 'themoviedb-javascript-library';
import { searchQueryStart, searchSimilarFilmStart } from '../../actions/';
import * as commons from '../../constants/commons';

class FilmsContainer extends Component {
    constructor(props) {
        super(props);

        const path = this.props.history.location.pathname.split('/');

        if (path[1] === 'search') {
            this.props.dispatch(searchQueryStart(path[2], this.props.searchType));
        } else if (path[1] === 'film') {
            this.props.dispatch(searchSimilarFilmStart(path[2]));
        }
    }

    getFilmsList() {
        return [...this.props.films].sort((filmA, filmB) => {
            if (this.props.sortCriteria === commons.sortByRating) {
                return filmB.vote_average - filmA.vote_average;
            } else if (this.props.sortCriteria === commons.sortByDate) {
                return new Date(filmB.release_date) - new Date(filmA.release_date);
            }
            return 0;
        }).map((film) => (
            <FilmItem
                show_title={film.title || film.name}
                release_year={film.release_date}
                category={film.genre_ids.join(', ')}
                id={film.id}
                poster={theMovieDb.common.getImage({
                    size: commons.posterSize,
                    file: film.poster_path
                })}
                key={film.id}
            />
        ));
    }

    render() {
        return (
            <ul className="films-container">
                {this.props.films && this.props.films.length ?
                    this.getFilmsList()
                    :
                    <div className="films-container__no-films-found">No films found</div>
                }
            </ul>
        );
    }
}

FilmsContainer.propTypes = {
    sortCriteria: PropTypes.string.isRequired,
    searchType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    films: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        films: state.films.data.results,
        sortCriteria: state.sortCriteria,
        searchType: state.search.searchType
    };
};

export default withRouter(connect(mapStateToProps)(FilmsContainer));
