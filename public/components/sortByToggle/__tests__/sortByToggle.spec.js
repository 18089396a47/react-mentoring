import React from 'react';
import renderer from 'react-test-renderer';
import { SortByToggle } from '../sortByToggle';
import { changeSortCriteria } from '../../../actions/';

const mockDigest = jest.fn();

jest.mock('../../../actions/index', () => ({
    changeSortCriteria: jest.fn()
}));

let props;

describe('SortByToggle component', () => {
    beforeEach(() => {
        props = {
            dispatch: mockDigest,
            sortCriteria: 'SORT_BY_DATE'
        };
    });

    it('SortByToggle should be shown correctly', () => {
        const tree = renderer.create(
            <SortByToggle {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('SortByToggle should call \'changeSortCriteria\' redux action on radio change', () => {
        const tree = shallow(<SortByToggle {...props} />);
        const radio = tree.find('.sort-by-toggle__option input').last();

        radio.simulate('change', {
            target: {
                checked: true
            }
        });
        expect(mockDigest).toHaveBeenCalled();
        expect(changeSortCriteria).toHaveBeenCalledWith('SORT_BY_RATING');
    });
});
