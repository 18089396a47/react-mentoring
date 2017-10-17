import * as types from '../constants/actions';

export const search = (query) => ({
    type: types.search,
    query
});
