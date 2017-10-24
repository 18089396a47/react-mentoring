import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './sortByToggleStyles';
import { changeSortCriteria } from '../../actions/';
import * as commons from '../../constants/commons';

class SortByToggle extends Component {
    changeCriteria(criteria) {
        this.props.dispatch(changeSortCriteria(criteria));
    }

    render() {
        return (
            <div className="sort-by-toggle">
                <span className="sort-by-toggle__title">Sort by</span>
                <label className="sort-by-toggle__option">
                    <input
                        type="radio"
                        name="sort-by-toggle"
                        checked={this.props.sortCriteria === commons.sortByDate}
                        onChange={this.changeCriteria.bind(this, commons.sortByDate)}
                    />
                    <span className="sort-by-toggle__option-title">release date</span>
                </label>
                <label className="sort-by-toggle__option">
                    <input
                        type="radio"
                        name="sort-by-toggle"
                        checked={this.props.sortCriteria === commons.sortByRating}
                        onChange={this.changeCriteria.bind(this, commons.sortByRating)}
                    />
                    <span className="sort-by-toggle__option-title">rating</span>
                </label>
            </div>
        );
    }
}

SortByToggle.propTypes = {
    sortCriteria: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        sortCriteria: state.sortCriteria
    };
};

export default connect(mapStateToProps)(SortByToggle);
