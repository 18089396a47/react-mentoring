import React from 'react';
import renderer from 'react-test-renderer';
import { FilmsSimilar } from '../filmsSimilar';


describe('FilmsSimilar component', () => {
    it('FilmsSimilar should show empty state', () => {
        const tree = renderer.create(
            <FilmsSimilar title="" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('FilmsSimilar should show film title', () => {
        const tree = renderer.create(
            <FilmsSimilar title="test title" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
