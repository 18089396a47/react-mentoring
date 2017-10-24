import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './searchTypeToggleStyles';
import { changeSearchType } from '../../actions/';
import * as commons from '../../constants/commons';

class SearchTypeToggle extends Component {
    changeType(newType) {
        this.props.dispatch(changeSearchType(newType));
    }

    render() {
        return (
            <div className="search-by-toggle">
                <span className="search-by-toggle__title">Search among</span>
                <label className="search-by-toggle__button">
                    <input
                        type="radio"
                        name="search-by-toggle"
                        checked={this.props.searchType === commons.searchTypeMovie}
                        onChange={this.changeType.bind(this, commons.searchTypeMovie)}
                    />
                    <span className="search-by-toggle__button-title">Movie</span>
                </label>
                <label className="search-by-toggle__button">
                    <input
                        type="radio"
                        name="search-by-toggle"
                        checked={this.props.searchType === commons.searchTypeTV}
                        onChange={this.changeType.bind(this, commons.searchTypeTV)}
                    />
                    <span className="search-by-toggle__button-title">TV</span>
                </label>
            </div>
        );
    }
}

SearchTypeToggle.propTypes = {
    searchType: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        searchType: state.search.searchType
    };
};

export default connect(mapStateToProps)(SearchTypeToggle);
