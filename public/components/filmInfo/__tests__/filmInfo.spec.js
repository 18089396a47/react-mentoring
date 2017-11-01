import React from 'react';
import renderer from 'react-test-renderer';
import { FilmInfo } from '../filmInfo';
import { searchFilmStart } from '../../../actions/';

const mockDigest = jest.fn();

jest.mock('../../searchMovieField/searchMovieField', () => 'SearchMovieField');
jest.mock('../../infoPanel/infoPanel', () => 'InfoPanel');
jest.mock('../../../helpers/getYear', () => jest.fn());
jest.mock('../../../actions/index', () => ({
    searchFilmStart: jest.fn()
}));

let props;

describe('FilmInfo component', () => {
    beforeEach(() => {
        props = {
            dispatch: mockDigest,
            searchType: 'searchType',
            show_title: 'showTitle',
            release_year: 'release_year',
            category: 'category',
            id: 111,
            poster: 'poster',
            rating: 222,
            runtime: 333,
            summary: 'summary',
            tagline: 'tagline',
            production_companies: 'productionCompanies'
        };
    });

    it('FilmInfo should be shown correctly', () => {
        props.history = {
            location: {
                pathname:'/'
            }
        };
        const tree = renderer.create(
            <FilmInfo {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('FilmInfo should call \'searchFilmStart\' redux actions on initializing when specific url', () => {
        props = {
            dispatch: mockDigest,
            searchType: 'searchType',
            history: {
                location: {
                    pathname:'/film/111'
                }
            }
        };
        const tree = shallow(<FilmInfo {...props} />);
        const link = tree.find('.film-item__title-link');

        expect(mockDigest).toHaveBeenCalled();
        expect(searchFilmStart).toHaveBeenCalledWith('111', 'searchType');
    });
});
