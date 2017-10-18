import * as types from '../constants/actions';

const searchReduser = (state = {}, action) => {
    switch (action.type) {
        case types.updateSearchResults:
            return Object.assign({}, state, {
                data: action.data
            });
        default:
            return state;
    }
};

export default searchReduser;
