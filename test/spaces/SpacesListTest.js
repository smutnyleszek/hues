import React from 'react';
import ReactDom from 'react-dom';
import SpacesList from 'spaces/SpacesList';

const TestUtils = React.addons.TestUtils;

describe('SpacesList', () => {
    it('should contain four spaces', () => {
        const result = TestUtils.renderIntoDocument(
            React.createElement(SpacesList)
        );
        console.log(result);

        expect(result.children).toBeDefined();
    });
});
