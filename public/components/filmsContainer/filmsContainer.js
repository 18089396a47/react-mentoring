import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './filmsContainerStyles';
import FilmItem from '../filmItem/filmItem';
import theMovieDb from 'themoviedb-javascript-library';
import { searchQueryStart } from '../../actions/';

let unlisten;
class FilmsContainer extends Component {
    constructor(props) {
        super(props);

        const searchFilm = function() {
            const path = props.history.location.pathname.split('/');

            if (path[1] === 'search') {
                props.dispatch(searchQueryStart(path[2]));
            }
        }

        searchFilm();

        unlisten = this.props.history.listen(searchFilm);
    }

    componentWillUnmount() {
        unlisten();
    }

    getFilmsList() {
        return this.props.films.map((film) => (
            <FilmItem
                show_title={film.title}
                release_year={film.release_date}
                category={film.genre_ids.join(', ')}
                id={film.id}
                poster={theMovieDb.common.getImage({
                    size: 'w342',
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
    dispatch: PropTypes.func.isRequired,
    films: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        films: state.films.data.results
    };
};

export default withRouter(connect(mapStateToProps)(FilmsContainer));
