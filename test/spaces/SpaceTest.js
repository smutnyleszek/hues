import React from 'react';
import Space from 'spaces/Space';
import huesAppStore from 'flux/huesAppStore';
import testHelpers from 'testHelpers';

const shallowRenderer = React.addons.TestUtils.createRenderer();

describe('Space', () => {
    it('should contain three inputs and a button', () => {
        const result = shallowRenderer.render(
            React.createElement(Space, {
                state: huesAppStore.state,
                spaceName: 'hsl'
            })
        );

        let inputsCount = 0;
        let copiersCount = 0;
        for (const child of result.props.children) {
            switch (testHelpers.getClassName(child.type)) {
                case 'SpaceInput':
                    inputsCount++;
                    break;
                case 'SpaceCopier':
                    copiersCount++;
                    break;
                default:
                    // NADA
            }
        }

        expect(inputsCount).toEqual(3);
        expect(copiersCount).toEqual(1);
    });
});
