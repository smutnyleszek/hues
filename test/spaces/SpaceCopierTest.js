import React from 'react';
import SpaceCopier from 'spaces/SpaceCopier';
import huesAppStore from 'flux/huesAppStore';

const shallowRenderer = React.addons.TestUtils.createRenderer();

describe('SpaceCopier', () => {
    it('should be a button with "copy" text on it', () => {
        const result = shallowRenderer.render(
            React.createElement(SpaceCopier, {
                state: huesAppStore.state,
                spaceName: 'hsl'
            })
        );

        expect(result.props.children).toEqual('copy');
        expect(result.type).toEqual('button');
    });
});
