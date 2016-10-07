import React from 'react';
import deepFreeze from '../helpers/deepFreeze';

const inputTypesMap = deepFreeze(new Map([
    ['hexadecimal', 'text'],
    ['integer', 'number']
]));

class SpaceInput extends React.Component {
    constructor(data) {
        super();
        this.id = data.id;
        this.category = data.category;
        this.range = data.range;
        this.maxlength = data.maxlength;
        this.onChangeCallback = data.onChangeCallback;
    }

    _onChange(e) {
        const currentValue = e.target.value;
        this.onChangeCallback(this.id, currentValue);
    }

    _getRenderAttributes() {
        const attributes = {};
        attributes.type = inputTypesMap.get(this.category);
        attributes.onChange = this._onChange.bind(this);
        // number input range limits
        if (typeof this.range !== 'undefined') {
            attributes.min = this.range[0];
            attributes.max = this.range[1];
        }
        // text input string length limit
        if (typeof this.maxlength !== 'undefined') {
            attributes.maxLength = this.maxlength;
        }
        return attributes;
    }

    render() {
        return React.createElement('input', this._getRenderAttributes());
    }
}

export default SpaceInput;
