import * as types from '../constants/actions';

export const updateSearchResults = (data) => ({
    type: types.updateSearchResults,
    data: JSON.parse(data)
});
