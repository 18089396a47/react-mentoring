import { combineReducers } from 'redux';
import search from './search';
import filmInfo from './filmInfo';
import films from './films';

export default combineReducers({
    search,
    filmInfo,
    films
});
