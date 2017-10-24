import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import './filmInforStyles';
import SearchMovieField from '../searchMovieField/searchMovieField';
import InfoPanel from '../infoPanel/infoPanel';
import theMovieDb from 'themoviedb-javascript-library';
import { searchFilmStart } from '../../actions/';
import getYear from '../../helpers/getYear';

let unlisten;
class FilmInfo extends Component {
    constructor(props) {
        super(props);

        const searchFilm = function() {
            const path = props.history.location.pathname.split('/');

            if (path[1] === 'film') {
                props.dispatch(searchFilmStart(path[2]));
            }
        }

        searchFilm();

        unlisten = this.props.history.listen(searchFilm);
    }

    componentWillUnmount() {
        unlisten();
    }

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
                        <div className="film-info__year">{getYear(this.props.release_year)}</div>
                        <div>{this.props.runtime} min</div>
                    </div>
                    <p className="film-info__summary">{this.props.summary}</p>
                    <div className="film-info__tagline">Tagline: {this.props.tagline}</div>
                    <div className="film-info__companies">Production companies: {this.props.production_companies}</div>
                </div>
            </div>
        );
    }
}

FilmInfo.propTypes = {
    show_title: PropTypes.string,
    rating: PropTypes.number,
    release_year: PropTypes.string,
    runtime: PropTypes.number,
    summary: PropTypes.string,
    tagline: PropTypes.string,
    production_companies: PropTypes.string,
    poster: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        show_title: state.filmInfo.title,
        rating: state.filmInfo.vote_average,
        release_year: state.filmInfo.release_date,
        runtime: state.filmInfo.runtime,
        summary: state.filmInfo.overview,
        poster: theMovieDb.common.getImage({
            size: 'w342',
            file: state.filmInfo.poster_path
        }),
        production_companies: state.filmInfo.production_companies
            .map(company => company.name).join(', '),
        tagline: state.filmInfo.tagline
    };
};

export default withRouter(connect(mapStateToProps)(FilmInfo));
