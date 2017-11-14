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

    return new Promise((resolve) => {
        searchMethod({
            id
        }, function(response) {
            dispatch(searchFilmEnd());
            dispatch(updateFilmInfo(JSON.parse(response)));
            resolve(null);
        }, function(err) {
            console.error(err);
            dispatch(searchFilmEnd());
            resolve(null);
        });
    });
};

export const updateFilmInfo = (data) => ({
    type: types.updateFilmInfo,
    data
});
