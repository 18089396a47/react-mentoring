import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';
import { updateSearchResults } from './films';
import * as commons from '../constants/commons';
import promiseWrapper from '../helpers/promiseWrapper';

export const changeSearchInput = (inputValue) => ({
    type: types.changeSearchInput,
    inputValue
});

export const searchQueryEnd = () => ({
    type: types.searchQueryEnd
});

export const searchQueryStart = (inputValue, searchType) => ({
    type: types.searchQueryStart,
    inputValue,
    searchType
});

function* fetchQuery({ inputValue, searchType }) {
    const searchMethod = searchType === commons.searchTypeMovie ?
        theMovieDb.search.getMovie : theMovieDb.search.getTv;

    try {
        const response = yield call(() => promiseWrapper(searchMethod, {
            query: inputValue
        }));

        yield put(searchQueryEnd());
        yield put(updateSearchResults(JSON.parse(response)))
    } catch (e) {
        yield put(searchQueryEnd());
    }
};

function* watchFetchQuery() {
    yield takeLatest(types.searchQueryStart, fetchQuery);
}

export const searchSimilarFilmEnd = () => ({
    type: types.searchSimilarFilmEnd
});

export const searchSimilarFilmStart = (id) => ({
    type: types.searchSimilarFilmStart,
    id
});

function* fetchSimilarFilms({ id }) {
    try {
        const response = yield call(() => promiseWrapper(theMovieDb.movies.getSimilarMovies, {
            id
        }));

        yield put(searchSimilarFilmEnd());
        yield put(updateSearchResults(JSON.parse(response)))
    } catch (e) {
        yield put(searchSimilarFilmEnd());
    }
};

function* watchFetchSimilarFilms() {
    yield takeLatest(types.searchSimilarFilmStart, fetchSimilarFilms);
}

export function* searchSaga() {
    yield all([
        watchFetchSimilarFilms(),
        watchFetchQuery()
    ]);
}

export const changeSearchType = (searchType) => ({
    type: types.changeSearchType,
    searchType
});
