import React from 'react';
import SpacesList from 'spaces/SpacesList';

const TestUtils = React.addons.TestUtils;
const renderer = TestUtils.createRenderer();

describe('SpacesList', () => {
    it('should contain four spaces', () => {
        const result = renderer.render(
            React.createElement(SpacesList)
        );

        expect(result.props.children).toBeDefined();
        expect(result.props.children.length).toEqual(4);
    });
});
