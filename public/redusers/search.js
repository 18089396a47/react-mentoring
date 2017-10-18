import * as types from '../constants/actions';

const searchReduser = (state = {}, action) => {
    switch (action.type) {
        case types.searchStart:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.searchEnd:
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.changeSearchInput:
            return Object.assign({}, state, {
                inputValue: action.inputValue
            });
        default:
            return state;
    }
};

export default searchReduser;
