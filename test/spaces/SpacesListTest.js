import React from 'react';
import SpacesList from 'spaces/SpacesList';
import huesAppStore from 'flux/huesAppStore';

const shallowRenderer = React.addons.TestUtils.createRenderer();

describe('SpacesList', () => {
    it('should contain four spaces', () => {
        const component = shallowRenderer.render(
            React.createElement(SpacesList, {
                state: huesAppStore.state
            })
        );

        expect(component.props.children).toBeDefined();
        expect(component.props.children.length).toEqual(4);
    });
});
