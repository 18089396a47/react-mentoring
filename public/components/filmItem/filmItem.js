import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './filmItemrStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';
import InfoPanel from '../infoPanel/infoPanel';

const FilmItem = ({
    show_title,
    release_year,
    category,
    poster
}) => (
    <li className="film-item">
        <Link to={`/film/${show_title}`}>
            <img className="film-item__poster" src={poster} alt={show_title} />
        </Link>
        <div className="film-item__info-wrapper">
            <div className="film-item__title-wrapper">
                <Link className="film-item__title-link" to={`/film/${show_title}`}>
                    <h3 className="film-item__title">{show_title}</h3>
                </Link>
                <span className="film-item__year">{release_year}</span>
            </div>
            <span className="film-item__category">{category}</span>
        </div>
    </li>
)

FilmItem.propTypes = {
    show_title: PropTypes.string.isRequired,
    release_year: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
};

export default FilmItem;
