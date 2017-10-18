import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './filmsContainerStyles';
import FilmItem from '../filmItem/filmItem';
import theMovieDb from 'themoviedb-javascript-library';

class FilmsContainer extends Component {
    getFilmsList() {
        return this.props.films.map((film) => (
            <FilmItem
                show_title={film.title}
                release_year={film.release_date}
                category={film.genre_ids}
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
    films: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    films: state.films.data.results
  };
};

export default connect(mapStateToProps)(FilmsContainer);
