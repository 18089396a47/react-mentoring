import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import theMovieDb from 'themoviedb-javascript-library';

import './commonStyles.styl';
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

theMovieDb.common.api_key = commons.apiKey;

export default class App extends Component {
    render() {
        return (
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
        );
    }
}
