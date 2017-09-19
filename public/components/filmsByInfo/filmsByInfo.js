import React from 'react';
import PropTypes from 'prop-types';

const FilmsByInfo = ({ director }) => (
    <span>{director ? `Films by ${director}` : null}</span>
);

FilmsByInfo.propTypes = {
    director: PropTypes.string
};

export default FilmsByInfo;
