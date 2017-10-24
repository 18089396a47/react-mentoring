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


    searchMethod({
        query: inputValue
    }, function(response) {
        dispatch(searchQueryEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, function(err) {
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

    theMovieDb.movies.getSimilarMovies({
        id
    }, function(response) {
        dispatch(searchSimilarFilmEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, function(err) {
        console.error(err);
        dispatch(searchSimilarFilmEnd());
    });
};

export const changeSearchType = (searchType) => ({
    type: types.changeSearchType,
    searchType
});
