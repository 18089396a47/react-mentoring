import React from 'react';
import renderer from 'react-test-renderer';
import SearchMovieField from '../searchMovieField';

jest.mock('../../searchButton/searchButton', () => 'SearchButton');
jest.mock('../../searchTypeToggle/searchTypeToggle', () => 'SearchTypeToggle');
jest.mock('../../searchInput/searchInput', () => 'SearchInput');

describe('SearchMovieField component', () => {
    it('SearchMovieField should', () => {
        const tree = renderer.create(
            <SearchMovieField />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
