import search from '../search';


describe('Search reduser', () => {
    it('Search reduser should return default state', () => {
        expect(search(undefined, {
            type: 'default'
        })).toEqual({});
    });

    it('Search reduser should handle SEARCH_QUERY_START', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: false,
            inputValue: 'test'
        }, {
            type: 'SEARCH_QUERY_START'
        })).toEqual({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        });
    });

    it('Search reduser should handle SEARCH_QUERY_END', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        }, {
            type: 'SEARCH_QUERY_END'
        })).toEqual({
            searchType: 'searchType',
            isFetching: false,
            inputValue: ''
        });
    });

    it('Search reduser should handle SEARCH_SIMILAR_FILM_START', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: false,
            inputValue: 'test'
        }, {
            type: 'SEARCH_SIMILAR_FILM_START'
        })).toEqual({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        });
    });

    it('Search reduser should handle SEARCH_SIMILAR_FILM_END', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        }, {
            type: 'SEARCH_SIMILAR_FILM_END'
        })).toEqual({
            searchType: 'searchType',
            isFetching: false,
            inputValue: 'test'
        });
    });

    it('Search reduser should handle CHANGE_SEARCH_INPUT', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        }, {
            type: 'CHANGE_SEARCH_INPUT',
            inputValue: 'newTestValue'
        })).toEqual({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'newTestValue'
        });
    });

    it('Search reduser should handle CHANGE_SEARCH_TYPE', () => {
        expect(search({
            searchType: 'searchType',
            isFetching: true,
            inputValue: 'test'
        }, {
            type: 'CHANGE_SEARCH_TYPE',
            searchType: 'newSearchType'
        })).toEqual({
            searchType: 'newSearchType',
            isFetching: true,
            inputValue: 'test'
        });
    });
});
