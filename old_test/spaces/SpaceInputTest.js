import React from 'react';
import SpaceInput from 'spaces/SpaceInput';
import huesAppStore from 'flux/huesAppStore';

const TestUtils = React.addons.TestUtils;

describe('SpaceInput', () => {
    it('should use current value from state', () => {
        const component = TestUtils.renderIntoDocument(
            React.createElement(SpaceInput, {
                state: huesAppStore.state,
                spaceName: 'hsl',
                propertyName: 'hue'
            })
        );

        const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        const stateValue = huesAppStore.state.spaces.get('hsl').properties.get('hue').value;
        expect(Number(input.value)).toBe(stateValue);
    });

    it('should update state on change', () => {
        const component = TestUtils.renderIntoDocument(
            React.createElement(SpaceInput, {
                state: huesAppStore.state,
                spaceName: 'hsl',
                propertyName: 'hue'
            })
        );

        const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        const newValue = 144;
        TestUtils.Simulate.change(input, {target: {value: newValue}});

        const stateValue = huesAppStore.state.spaces.get('hsl').properties.get('hue').value;
        expect(Number(newValue)).toBe(stateValue);
    });
});
