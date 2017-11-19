import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import redusers from './redusers/';
import rootSaga from './actions/';

import * as commons from './constants/commons';

const sagaMiddleware = createSagaMiddleware();

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
    let enhancer= applyMiddleware(sagaMiddleware);

    const store = createStore(redusers, defaultState, enhancer);

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    sagaMiddleware.run(rootSaga);

    return store;
};
