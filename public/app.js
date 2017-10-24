import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import theMovieDb from 'themoviedb-javascript-library';

import './commonStyles';
import PageHeader from './components/pageHeader/pageHeader';
import PageFooter from './components/pageFooter/pageFooter';
import FilmsContainer from './components/filmsContainer/filmsContainer';
import SearchMovieWrapper from './components/searchMovieWrapper/searchMovieWrapper';
import SearchPageButton from './components/searchPageButton/searchPageButton';
import InfoPanel from './components/infoPanel/infoPanel';
import FilmInfo from './components/filmInfo/filmInfo';
import FilmCounter from './components/filmCounter/filmCounter';
import SortByToggle from './components/sortByToggle/sortByToggle';
import FilmsSimilar from './components/filmsSimilar/filmsSimilar';
import * as commons from './constants/commons';

import redusers from './redusers/';

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

let enhancer;
if (isProduction) {
    enhancer = applyMiddleware(thunkMiddleware);
} else {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

    enhancer = composeEnhancers(
        applyMiddleware(thunkMiddleware)
    );
}

const store = createStore(redusers, defaultState, enhancer);

theMovieDb.common.api_key = commons.apiKey;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <div className="content">
                            <Switch>
                                <Route path="/film/:name">
                                    <PageHeader headerComponents={<SearchPageButton />}>
                                        <FilmInfo />
                                        <InfoPanel>
                                            <FilmsSimilar />
                                        </InfoPanel>
                                    </PageHeader>
                                </Route>
                                <Route path="/search/:text">
                                    <PageHeader>
                                        <SearchMovieWrapper />
                                        <InfoPanel>
                                            <FilmCounter />
                                            <SortByToggle />
                                        </InfoPanel>
                                    </PageHeader>
                                </Route>
                                <Route path="*">
                                    <PageHeader>
                                        <SearchMovieWrapper />
                                        <InfoPanel />
                                    </PageHeader>
                                </Route>
                            </Switch>
                            <FilmsContainer />
                        </div>
                        <PageFooter />
                    </div>
                </Router>
            </Provider>
        );
    }
}
