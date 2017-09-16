import React, { Component } from 'react';
import './searchByToggleStyles';

export default class SearchByToggle extends Component {
    render() {
        return (
            <div className="search-by-toggle">
                <span className="search-by-toggle__title">Search by</span>
                <label className="search-by-toggle__button">
                    <input type="radio" name="search-by-toggle" defaultChecked />
                    <span className="search-by-toggle__button-title">Title</span>
                </label>
                <label className="search-by-toggle__button">
                    <input type="radio" name="search-by-toggle" />
                    <span className="search-by-toggle__button-title">Director</span>
                </label>
            </div>
        );
    }
}
