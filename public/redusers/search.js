import * as types from '../constants/actions';

const searchReduser = (state = {}, action) => {
    switch (action.type) {
        case types.searchQueryStart:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.searchQueryEnd:
            return Object.assign({}, state, {
                inputValue: '',
                isFetching: false
            });
        case types.searchSimilarFilmStart:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.searchSimilarFilmEnd:
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.changeSearchInput:
            return Object.assign({}, state, {
                inputValue: action.inputValue
            });
        case types.changeSearchType:
            return Object.assign({}, state, {
                searchType: action.searchType
            })
        default:
            return state;
    }
};

export default searchReduser;
