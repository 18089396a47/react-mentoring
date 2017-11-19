import { call, put, all, takeLatest } from 'redux-saga/effects';
import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';
import * as commons from '../constants/commons';
import promiseWrapper from '../helpers/promiseWrapper';

export const searchFilmEnd = () => ({
    type: types.searchFilmEnd
});

export const searchFilmStart = (id, searchType) => ({
    type: types.searchFilmStart,
    id,
    searchType
});

function* fetchFilm({ id, searchType }) {
    const searchMethod = searchType === commons.searchTypeMovie ?
        theMovieDb.movies.getById : theMovieDb.tv.getById;

    try {
        const response = yield call(() => promiseWrapper(searchMethod, {
            id
        }));

        yield put(searchFilmEnd());
        yield put(updateFilmInfo(JSON.parse(response)))
    } catch (e) {
        yield put(searchFilmEnd());
    }
}

function* watchFetchFilm() {
    yield takeLatest(types.searchFilmStart, fetchFilm);
}

export function* filmInfoSaga() {
    yield all([
        watchFetchFilm()
    ]);
}

export const updateFilmInfo = (data) => ({
    type: types.updateFilmInfo,
    data
});
