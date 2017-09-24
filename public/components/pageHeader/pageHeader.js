import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './pageHeaderStyles';

export default class PageHeader extends Component {
    render() {
        return (
            <header className="page-header">
                <div className="page-header__link-wrapper">
                    <Link to="/" className="page-header__link">netflixroulette</Link>
                    {this.props.headerComponents}
                </div>
                {this.props.children}
            </header>
        );
    }
}

PageHeader.propTypes = {
    headerComponents: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};
