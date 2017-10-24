import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './filmItemrStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';
import InfoPanel from '../infoPanel/infoPanel';
import getYear from '../../helpers/getYear';
import { searchFilmStart, searchSimilarFilmStart } from '../../actions/';

const FilmItem = ({
    dispatch,
    searchType,
    show_title,
    release_year,
    category,
    id,
    poster
}) => {
    const searchFilm = () => {
        dispatch(searchFilmStart(id, searchType));
        dispatch(searchSimilarFilmStart(id));
    };

    return (
        <li className="film-item">
            <Link to={`/film/${id}`} onClick={searchFilm}>
                <img className="film-item__poster" src={poster} alt={show_title} />
            </Link>
            <div className="film-item__info-wrapper">
                <div className="film-item__title-wrapper">
                    <Link className="film-item__title-link" to={`/film/${show_title}`} onClick={searchFilm}>
                        <h3 className="film-item__title">{show_title}</h3>
                    </Link>
                    <span className="film-item__year">{getYear(release_year)}</span>
                </div>
                <span className="film-item__category">{category}</span>
            </div>
        </li>
    );
};

FilmItem.propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchType: PropTypes.string.isRequired,
    show_title: PropTypes.string.isRequired,
    release_year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        searchType: state.search.searchType
    };
};

export default connect(mapStateToProps)(FilmItem);
