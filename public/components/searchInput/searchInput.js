import React, { Component } from 'react';
import './searchInputStyles';

export default class SearchInput extends Component {
    render() {
        return (
            <div className="search-input">
                <input className="search-input__field" placeholder="Enter something..." />
                <div className="search-input__icon"></div>
            </div>
        );
    }
}
