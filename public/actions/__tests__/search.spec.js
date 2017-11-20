import * as search from '../search';
import { call, put } from 'redux-saga/effects';
import theMovieDb from 'themoviedb-javascript-library';
import { updateSearchResults } from '../films';
import promiseWrapper from '../../helpers/promiseWrapper';
import sagaHelper from 'redux-saga-testing';

jest.mock('themoviedb-javascript-library', () => ({
    movies: {
        getSimilarMovies: jest.fn((param, success, fail) => {
            if (param.id === 'invalid') {
                fail('error');
            } else {
                success('["mockResults"]');
            }
        })
    },
    search: {
        getMovie: jest.fn((param, success, fail) => {
            if (param.query === 'invalid') {
                fail('error');
            } else {
                success('["mockResults"]');
            }
        }),
        getTv: jest.fn((param, success, fail) => {
            if (param.query === 'invalid') {
                fail('error');
            } else {
                success('["mockResults"]');
            }
        })
    }
}));
jest.mock('../../helpers/promiseWrapper', () => (
    jest.fn()
));

describe('Search action creators', () => {
    it('ChangeSearchInput action should return correct object', () => {
        expect(search.changeSearchInput('test')).toEqual({
            type: 'CHANGE_SEARCH_INPUT',
            inputValue: 'test'
        });
    });

    it('ChangeSearchType action should return correct object', () => {
        expect(search.changeSearchType('test')).toEqual({
            type: 'CHANGE_SEARCH_TYPE',
            searchType: 'test'
        });
    });

    it('SearchQueryEnd action should return correct object', () => {
        expect(search.searchQueryEnd()).toEqual({
            type: 'SEARCH_QUERY_END'
        });
    });

    it('SearchSimilarFilmEnd action should return correct object', () => {
        expect(search.searchSimilarFilmEnd()).toEqual({
            type: 'SEARCH_SIMILAR_FILM_END'
        });
    });

    it('SearchQueryStart action should return correct object', () => {
        expect(search.searchQueryStart('test', 'searchType')).toEqual({
            type: 'SEARCH_QUERY_START',
            inputValue: 'test',
            searchType: 'searchType'
        });
    });

    it('SearchSimilarFilmStart action should return correct object', () => {
        expect(search.searchSimilarFilmStart('id')).toEqual({
            type: 'SEARCH_SIMILAR_FILM_START',
            id: 'id'
        });
    });

    describe('fetchSimilarFilms saga with api fail', () => {
        const it = sagaHelper(search.fetchSimilarFilms({ id: 'invalid' }));

        it('should call api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.movies.getSimilarMovies, {
                id: 'invalid'
            }));
 
            return new Error();
        });

        it('and then put searchSimilarFilmEnd action', result => {
            expect(result).toEqual(put(search.searchSimilarFilmEnd()));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe('fetchSimilarFilms saga with api suscces', () => {
        const it = sagaHelper(search.fetchSimilarFilms({ id: 'valid' }));

        it('should call api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.movies.getSimilarMovies, {
                id: 'valid'
            }));
 
            return '["mockResults"]';
        });

        it('and then put searchSimilarFilmEnd action', result => {
            expect(result).toEqual(put(search.searchSimilarFilmEnd()));
        });

        it('and then put updateSearchResults action', result => {
            expect(result).toEqual(put(updateSearchResults('["mockResults"]')));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe('fetchQuery saga when \'searchType\' is \'SEARCH_TYPE_MOVIE\' with api fail', () => {
        const it = sagaHelper(search.fetchQuery({ inputValue: 'test', searchType: 'SEARCH_TYPE_MOVIE' }));

        it('should call getMovie api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.search.getMovie, {
                query: 'test'
            }));
 
            return new Error();
        });

        it('and then put searchQueryEnd action', result => {
            expect(result).toEqual(put(search.searchQueryEnd()));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe('fetchQuery saga when \'searchType\' is \'SEARCH_TYPE_TV\' with api fail', () => {
        const it = sagaHelper(search.fetchQuery({ inputValue: 'test', searchType: 'SEARCH_TYPE_TV' }));

        it('should call getTv api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.search.getTv, {
                query: 'test'
            }));
 
            return new Error();
        });

        it('and then put searchQueryEnd action', result => {
            expect(result).toEqual(put(search.searchQueryEnd()));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe('fetchQuery saga when \'searchType\' is \'SEARCH_TYPE_MOVIE\' with api success', () => {
        const it = sagaHelper(search.fetchQuery({ inputValue: 'test', searchType: 'SEARCH_TYPE_MOVIE' }));

        it('should call getMovie api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.search.getMovie, {
                query: 'test'
            }));
 
            return '["results"]';
        });

        it('and then put searchQueryEnd action', result => {
            expect(result).toEqual(put(search.searchQueryEnd()));
        });

        it('and then put updateSearchResults action', result => {
            expect(result).toEqual(put(updateSearchResults('["results"]')));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });

    describe('fetchQuery saga when \'searchType\' is \'SEARCH_TYPE_TV\' with api success', () => {
        const it = sagaHelper(search.fetchQuery({ inputValue: 'test', searchType: 'SEARCH_TYPE_TV' }));

        it('should call getTv api request', result => {
            expect(result).toEqual(call(promiseWrapper, theMovieDb.search.getTv, {
                query: 'test'
            }));
 
            return '["results"]';
        });

        it('and then put searchQueryEnd action', result => {
            expect(result).toEqual(put(search.searchQueryEnd()));
        });

        it('and then put updateSearchResults action', result => {
            expect(result).toEqual(put(updateSearchResults('["results"]')));
        });
 
        it('and then nothing', result => {
            expect(result).toBeUndefined();
        });
    });
});
