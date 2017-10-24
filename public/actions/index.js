import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';

export const changeSearchInput = (inputValue) => ({
    type: types.changeSearchInput,
    inputValue
});

export const searchQueryEnd = () => ({
    type: types.searchQueryEnd
});

export const searchQueryStart = (inputValue) => (dispatch) => {
    dispatch({
        type: types.searchQueryStart,
        inputValue
    });

    theMovieDb.search.getMovie({
        query: inputValue
    }, function(response) {
        dispatch(searchQueryEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, function(err) {
        console.error(err);
        dispatch(searchQueryEnd());
    });
};

export const searchFilmEnd = () => ({
    type: types.searchFilmEnd
});

export const searchFilmStart = (id) => (dispatch) => {
    dispatch({
        type: types.searchFilmStart,
        id
    });

    theMovieDb.movies.getById({
        id
    }, function(response) {
        dispatch(searchFilmEnd());
        dispatch(updateFilmInfo(JSON.parse(response)));
    }, function(err) {
        console.error(err);
        dispatch(searchFilmEnd());
    });
};

export const updateSearchResults = (data) => ({
    type: types.updateSearchResults,
    data
});

export const updateFilmInfo = (data) => ({
    type: types.updateFilmInfo,
    data
});
