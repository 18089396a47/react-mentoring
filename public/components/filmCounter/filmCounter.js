import React from 'react';
import PropTypes from 'prop-types';

const FilmCounter = (props) => (
    <span>{props.count > 0 ? `${props.count} movies found` : null}</span>
);

FilmCounter.propTypes = {
    count: PropTypes.number
};

export default FilmCounter;
