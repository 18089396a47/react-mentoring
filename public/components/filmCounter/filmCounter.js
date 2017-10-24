import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilmCounter = (props) => (
    <span>{props.count > 0 ? `${props.count} movies found` : null}</span>
);

FilmCounter.propTypes = {
    count: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        count: state.films.data.results.length
    };
};

export default connect(mapStateToProps)(FilmCounter);
