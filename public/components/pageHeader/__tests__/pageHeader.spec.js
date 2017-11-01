import React from 'react';
import renderer from 'react-test-renderer';
import PageHeader from '../pageHeader';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('PageHeader component', () => {
    it('PageHeader should be shown correctly without headerComponents', () => {
        const tree = renderer.create(
            <PageHeader>
                <span>children</span>
            </PageHeader>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('PageHeader should be shown correctly with headerComponents', () => {
        const tree = renderer.create(
            <PageHeader
                headerComponents={<span>headerComponents</span>}
                >
                <span>children</span>
            </PageHeader>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
