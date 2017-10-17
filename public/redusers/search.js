import * as types from '../constants/actions';

const searchReduser = (state = [], action) => {
  switch (action.type) {
    case types.search:
      return action.filter;
    default:
      return state;
  }
};

export default searchReduser;
