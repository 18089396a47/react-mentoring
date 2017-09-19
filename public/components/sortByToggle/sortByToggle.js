import React, { Component } from 'react';
import './sortByToggleStyles';

export default class SortByToggle extends Component {
    render() {
        return (
            <div className="sort-by-toggle">
                <span className="sort-by-toggle__title">Sort by</span>
                <label className="sort-by-toggle__option">
                    <input type="radio" name="sort-by-toggle" />
                    <span className="sort-by-toggle__option-title">release date</span>
                </label>
                <label className="sort-by-toggle__option">
                    <input type="radio" name="sort-by-toggle" defaultChecked />
                    <span className="sort-by-toggle__option-title">rating</span>
                </label>
            </div>
        );
    }
}
