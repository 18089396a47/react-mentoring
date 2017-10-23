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
import FilmsByInfo from './components/filmsByInfo/filmsByInfo';

import redusers from './redusers/';

const defaultState = {
    search: {
        inputValue: ''
    },
    films: {
        data: {
            results: []
        }
    }
};
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware)
);
const store = createStore(redusers, defaultState, enhancer);

theMovieDb.common.api_key = 'fdb89995ee84c3ba06f60793f93898fc';

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
                                        <FilmInfo
                                            director={'Quentin Tarantino'}
                                            show_title={'KILL BILL: VOL. 1'}
                                            release_year={'2003'}
                                            poster={'http://netflixroulette.net/api/posters/60031236.jpg'}
                                            rating={'3.8'}
                                            runtime={'111 min'}
                                            show_cast={'Uma Thurman, Lucy Liu, Vivica A. Fox, Daryl Hannah, David Carradine, Michael Madsen, Julie Dreyfus, Chiaki Kuriyama, Sonny Chiba, Gordon Liu'}
                                            summary={'An assassin is shot by her ruthless employer, Bill, and other members of their assassination circle. But she lives -- and plots her vengeance.'}
                                        />
                                        <InfoPanel>
                                            <FilmsByInfo director={'Quentin Tarantino'} />
                                        </InfoPanel>
                                    </PageHeader>
                                </Route>
                                <Route path="/search/:text">
                                    <PageHeader>
                                        <SearchMovieWrapper />
                                        <InfoPanel>
                                            <FilmCounter count={7} />
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
