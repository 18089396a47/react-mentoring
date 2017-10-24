import { combineReducers } from 'redux';
import search from './search';
import sortCriteria from './sortCriteria';
import filmInfo from './filmInfo';
import films from './films';

export default combineReducers({
    search,
    sortCriteria,
    filmInfo,
    films
});
