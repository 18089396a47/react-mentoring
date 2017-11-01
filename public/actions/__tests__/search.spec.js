import * as search from '../search';
import theMovieDb from 'themoviedb-javascript-library';
import { updateSearchResults } from '../films';

jest.mock('../films', () => ({
    updateSearchResults: jest.fn()
}));
jest.mock('themoviedb-javascript-library', () => ({
    movies: {
        getSimilarMovies: jest.fn((param, success, fail) => {
            if (param.id === 'invalid') {
                fail('error');
            } else {
                success('["mockResults"]');
            }
        })
    }
}));

let globalConsoleError;

describe('Search action creators', () => {
    beforeEach(() => {
        globalConsoleError = global.console.error;

        global.console.error = jest.fn();
    })

    afterEach(() => {
        global.console.error = globalConsoleError;
    });

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

    it('searchSimilarFilmStart action should return correct function that call API request, \'searchSimilarFilmEnd\' action on fail', () => {
        const asyncAction = search.searchSimilarFilmStart('invalid');
        const mockDigest = jest.fn();

        asyncAction(mockDigest);
        expect(mockDigest).toHaveBeenCalledWith({
            type: 'SEARCH_SIMILAR_FILM_START',
            id: 'invalid'
        });
        expect(mockDigest).toHaveBeenCalledWith({
            type: 'SEARCH_SIMILAR_FILM_END'
        });
        expect(mockDigest.mock.calls.length).toBe(2);
        expect(theMovieDb.movies.getSimilarMovies).toHaveBeenCalled();
        expect(global.console.error).toHaveBeenCalledWith('error');

    });

    it('searchSimilarFilmStart action should return correct function that call API request, \'updateSearchResults\' and \'searchSimilarFilmEnd\' action on success', () => {
        updateSearchResults.mockReset();
        const asyncAction = search.searchSimilarFilmStart('valid');
        const mockDigest = jest.fn();

        asyncAction(mockDigest);
        expect(mockDigest).toHaveBeenCalledWith({
            type: 'SEARCH_SIMILAR_FILM_START',
            id: 'valid'
        });
        expect(updateSearchResults).toHaveBeenCalledWith(['mockResults']);
        expect(mockDigest).toHaveBeenCalledWith({
            type: 'SEARCH_SIMILAR_FILM_END'
        });
        expect(mockDigest.mock.calls.length).toBe(3);
        expect(theMovieDb.movies.getSimilarMovies).toHaveBeenCalled();

    });
});
