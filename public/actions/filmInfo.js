import * as types from '../constants/actions';
import theMovieDb from 'themoviedb-javascript-library';
import * as commons from '../constants/commons';

export const searchFilmEnd = () => ({
    type: types.searchFilmEnd
});

export const searchFilmStart = (id, searchType) => (dispatch) => {
    const searchMethod = searchType === commons.searchTypeMovie ?
        theMovieDb.movies.getById : theMovieDb.tv.getById;

    dispatch({
        type: types.searchFilmStart,
        id
    });

    searchMethod({
        id
    }, function(response) {
        dispatch(searchFilmEnd());
        dispatch(updateFilmInfo(JSON.parse(response)));
    }, function(err) {
        console.error(err);
        dispatch(searchFilmEnd());
    });
};

export const updateFilmInfo = (data) => ({
    type: types.updateFilmInfo,
    data
});
