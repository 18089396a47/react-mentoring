import { combineReducers } from 'redux';
import search from './search';
import films from './films';

export default combineReducers({
    search,
    films
});
