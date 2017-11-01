import React from 'react';
import renderer from 'react-test-renderer';
import { SearchInput } from '../searchInput';
import { searchQueryStart, changeSearchInput } from '../../../actions/';

const mockDigest = jest.fn();

jest.mock('../../../actions/index', () => ({
    searchQueryStart: jest.fn(),
    changeSearchInput: jest.fn()
}));

let props;

describe('SearchInput component', () => {
    beforeEach(() => {
        props = {
            dispatch: mockDigest,
            searchType: 'searchType',
            inputValue: 'inputValue'
        };
    });

    it('SearchInput should be shown correctly', () => {
        const tree = renderer.create(
            <SearchInput {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('SearchInput should call \'changeSearchInput\' redux action on input keyDown', () => {
        const tree = shallow(<SearchInput {...props} />);
        const input = tree.find('.search-input__field');

        input.simulate('change', {
            target: {
                value: 'newInputValue'
            }
        });
        expect(mockDigest).toHaveBeenCalled();
        expect(changeSearchInput).toHaveBeenCalledWith('newInputValue');
    });

    it('SearchInput should call \'searchQueryStart\' redux action, history push on input keyDown', () => {
        props.history = {
            push: jest.fn()
        };
        const tree = shallow(<SearchInput {...props} />);

        tree.simulate('submit', { preventDefault: jest.fn() });
        expect(mockDigest).toHaveBeenCalled();
        expect(props.history.push).toHaveBeenCalledWith('/search/inputValue');
        expect(searchQueryStart).toHaveBeenCalledWith('inputValue', 'searchType');
    });
});
