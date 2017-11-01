import React from 'react';
import renderer from 'react-test-renderer';
import PageFooter from '../pageFooter';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('PageFooter component', () => {
    it('PageFooter should be shown correctly', () => {
        const tree = renderer.create(
            <PageFooter />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
