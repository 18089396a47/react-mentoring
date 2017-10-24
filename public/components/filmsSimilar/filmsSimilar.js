import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FilmsSimilar = ({ title }) => (
    <span>{title ? `Similar as ${title}` : null}</span>
);

FilmsSimilar.propTypes = {
    title: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        title: state.filmInfo.title
    };
};

export default connect(mapStateToProps)(FilmsSimilar);
