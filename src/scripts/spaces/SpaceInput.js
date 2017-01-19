import HuesAppActions from '../flux/huesAppActions';
import React from 'react';
import deepFreeze from '../helpers/deepFreeze';

const inputTypesMap = deepFreeze(new Map([
    ['hexadecimal', 'text'],
    ['integer', 'number']
]));

class SpaceInput extends React.Component {
    _onChange(changeEvent) {
        HuesAppActions.setSpacePropertyValue({
            spaceName: this.props.spaceName,
            propertyName: this.props.propertyName,
            newValue: changeEvent.target.value
        });
    }

    _getRenderAttributes() {
        const attributes = {};
        const spaceData = this.props.state.spaces.get(this.props.spaceName);
        const propertyData = spaceData.properties.get(this.props.propertyName);

        attributes.name = this.props.propertyName;

        attributes.value = propertyData.value;

        attributes.type = inputTypesMap.get(propertyData.category);

        // number input range limits
        if (typeof propertyData.range !== 'undefined') {
            attributes.min = propertyData.range[0];
            attributes.max = propertyData.range[1];
            attributes.step = 1;
        }

        // text input string length limit
        if (typeof propertyData.maxlength !== 'undefined') {
            attributes.maxLength = propertyData.maxlength;
        }

        attributes.onChange = this._onChange.bind(this);

        return attributes;
    }

    render() {
        console.log('SpaceInput render - props', this.props);
        return React.createElement('input', this._getRenderAttributes());
    }
}

export default SpaceInput;
