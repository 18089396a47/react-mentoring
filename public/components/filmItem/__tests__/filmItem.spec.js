import React from 'react';
import renderer from 'react-test-renderer';
import { FilmItem } from '../filmItem';
import { searchFilmStart, searchSimilarFilmStart } from '../../../actions/';

const mockDigest = jest.fn();

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('../../searchMovieField/searchMovieField', () => 'SearchMovieField');
jest.mock('../../infoPanel/infoPanel', () => 'InfoPanel');
jest.mock('../../../helpers/getYear', () => jest.fn());
jest.mock('../../../actions/index', () => ({
    searchFilmStart: jest.fn(),
    searchSimilarFilmStart: jest.fn()
}));

let props;

describe('FilmItem component', () => {
    beforeEach(() => {
        props = {
            dispatch: mockDigest,
            searchType: 'searchType',
            show_title: 'showTitle',
            release_year: 'release_year',
            category: 'category',
            id: 111,
            poster: 'poster'
        };
    });

    it('FilmItem should be shown correctly', () => {
        const tree = renderer.create(
            <FilmItem {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('FilmItem should call \'searchFilmStart\' and \'searchSimilarFilmStart\' redux actions on link click', () => {
        const tree = shallow(<FilmItem {...props} />);
        const link = tree.find('.film-item__title-link');

        link.simulate('click');
        expect(mockDigest.mock.calls.length).toBe(2);
        expect(searchFilmStart).toHaveBeenCalledWith(111, 'searchType');
        expect(searchSimilarFilmStart).toHaveBeenCalledWith(111);
    });
});
