import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './filmInforStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';
import InfoPanel from '../infoPanel/infoPanel';

export default class FilmInfo extends Component {
    render() {
        return (
            <div className="film-info">
                <div>
                    <img className="film-info__poster" src={this.props.poster} alt={this.props.show_title} />
                </div>
                <div className="film-info__info-wrapper">
                    <div className="film-info__title-wrapper">
                        <h1 className="film-info__title">{this.props.show_title}</h1>
                        <div className="film-info__rating">{this.props.rating}</div>
                    </div>
                    <div className="film-info__oscar">Oscar-winning Movies</div>
                    <div className="film-info__year-wrapper">
                        <div className="film-info__year">{this.props.release_year}</div>
                        <div>{this.props.runtime}</div>
                    </div>
                    <p className="film-info__summary">{this.props.summary}</p>
                    <div className="film-info__director">Director: {this.props.director}</div>
                    <div className="film-info__cast">Cast: {this.props.show_cast}</div>
                </div>
            </div>
        );
    }
}

FilmInfo.propTypes = {
    show_title: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    release_year: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    show_cast: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
};
