import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';
import { updateSearchResults } from './films';
import * as commons from '../constants/commons';

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

    return new Promise((resolve) => {
        searchMethod({
            query: inputValue
        }, function(response) {
            dispatch(searchQueryEnd());
            dispatch(updateSearchResults(JSON.parse(response)));
            resolve(null);
        }, function(err) {
            console.error(err);
            dispatch(searchQueryEnd());
            resolve(null);
        });
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

    return new Promise((resolve) => {
        theMovieDb.movies.getSimilarMovies({
            id
        }, function(response) {
            dispatch(searchSimilarFilmEnd());
            dispatch(updateSearchResults(JSON.parse(response)));
            resolve(null);
        }, function(err) {
            console.error(err);
            dispatch(searchSimilarFilmEnd());
            resolve(null);
        });
    });
};

export const changeSearchType = (searchType) => ({
    type: types.changeSearchType,
    searchType
});
