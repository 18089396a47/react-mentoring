import * as types from '../constants/actions';
import * as commons from '../constants/commons';

const sortCriteria = (state = commons.sortByRating, action) => {
    switch (action.type) {
        case types.changeSortCriteria:
            return action.sortCriteria;
        default:
            return state;
    }
};

export default sortCriteria;
