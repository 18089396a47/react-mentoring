import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './searchTypeToggleStyles';
import { changeSearchType } from '../../actions/';

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
                        checked={this.props.searchType === 'movie'}
                        onChange={this.changeType.bind(this, 'movie')}
                    />
                    <span className="search-by-toggle__button-title">Movie</span>
                </label>
                <label className="search-by-toggle__button">
                    <input
                        type="radio"
                        name="search-by-toggle"
                        checked={this.props.searchType === 'tv'}
                        onChange={this.changeType.bind(this, 'tv')}
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
