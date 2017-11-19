import { all } from 'redux-saga/effects';

import { filmInfoSaga } from './filmInfo';
import { searchSaga } from './search';

export default function* rootSaga() {
    yield all([
        filmInfoSaga(),
        searchSaga()
    ]);
}

export * from './search';
export * from './sortCriteria';
export * from './filmInfo';
export * from './films';
