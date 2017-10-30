import React from 'react';
import renderer from 'react-test-renderer';
import { FilmCounter } from '../filmCounter';


describe('FilmCounter component', () => {
    it('FilmCounter should show empty state', () => {
        const tree = renderer.create(
            <FilmCounter count={0} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('FilmCounter should show film count', () => {
        const tree = renderer.create(
            <FilmCounter count={1} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
