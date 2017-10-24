import * as types from '../constants/actions';

const searchReduser = (state = {}, action) => {
    switch (action.type) {
        case types.searchFilmStart:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.searchFilmEnd:
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.updateFilmInfo:
            return Object.assign({}, action.data);
        default:
            return state;
    }
};

export default searchReduser;
