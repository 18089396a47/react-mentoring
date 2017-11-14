import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import redusers from './redusers/';

import * as commons from './constants/commons';

const defaultState = {
    search: {
        inputValue: '',
        searchType: commons.searchTypeMovie
    },
    sortCriteria: commons.sortByRating,
    filmInfo: {
        production_companies: []
    },
    films: {
        data: {
            results: []
        }
    }
};

export default (initialState = defaultState) => {
    let enhancer= applyMiddleware(thunkMiddleware);

    const store = createStore(redusers, defaultState, enhancer);

    return store;
};
