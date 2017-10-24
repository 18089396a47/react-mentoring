import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';

export const changeSearchInput = (inputValue) => ({
    type: types.changeSearchInput,
    inputValue
});

export const searchQueryEnd = () => ({
    type: types.searchQueryEnd
});

export const searchQueryStart = (inputValue, searchType) => (dispatch) => {
    const searchMethod = searchType === 'movie' ? theMovieDb.search.getMovie : theMovieDb.search.getTv;

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

export const updateSearchResults = (data) => ({
    type: types.updateSearchResults,
    data
});

export const updateFilmInfo = (data) => ({
    type: types.updateFilmInfo,
    data
});

export const changeSearchType = (searchType) => ({
    type: types.changeSearchType,
    searchType
});
