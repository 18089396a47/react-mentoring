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

export const searchQueryStart = (inputValue, searchType) => (dispatch) => {
    const searchMethod = searchType === commons.searchTypeMovie ?
        theMovieDb.search.getMovie : theMovieDb.search.getTv;

    dispatch({
        type: types.searchQueryStart,
        inputValue
    });

    return promiseWrapper(searchMethod, {
        query: inputValue
    }, (response) => {
        dispatch(searchQueryEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, (err) => {
        console.error(err);
        dispatch(searchQueryEnd());
    });
};

export const searchSimilarFilmEnd = () => ({
    type: types.searchSimilarFilmEnd
});

export const searchSimilarFilmStart = (id) => (dispatch) => {
    dispatch({
        type: types.searchSimilarFilmStart,
        id
    });

    return promiseWrapper(theMovieDb.movies.getSimilarMovies, {
        id
    }, (response) => {
        dispatch(searchSimilarFilmEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, (err) => {
        console.error(err);
        dispatch(searchSimilarFilmEnd());
    });
};

export const changeSearchType = (searchType) => ({
    type: types.changeSearchType,
    searchType
});
