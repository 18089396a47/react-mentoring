import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './filmsContainerStyles';
import FilmItem from '../filmItem/filmItem';

class FilmsContainer extends Component {
    getFilmsList() {
        return this.props.films.map((film) => (
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
    films: state.films
  };
};

export default connect(mapStateToProps)(FilmsContainer);
