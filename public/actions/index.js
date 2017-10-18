import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';

export const changeSearchInput = (inputValue) => ({
    type: types.changeSearchInput,
    inputValue
});

export const searchEnd = () => ({
    type: types.searchEnd
});

export const searchStart = (inputValue) => (dispatch) => {
    dispatch({
        type: types.searchStart,
        inputValue
    });

    theMovieDb.search.getMovie({
        query: inputValue
    }, function(response) {
        dispatch(searchEnd());
        dispatch(updateSearchResults(JSON.parse(response)));
    }, function(err) {
        console.error(err);
        dispatch(searchEnd());
    });
};

export const updateSearchResults = (data) => ({
    type: types.updateSearchResults,
    data
});
