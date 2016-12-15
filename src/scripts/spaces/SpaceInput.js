import React from 'react';
import deepFreeze from '../helpers/deepFreeze';

const inputTypesMap = deepFreeze(new Map([
    ['hexadecimal', 'text'],
    ['integer', 'number']
]));

class SpaceInput extends React.Component {
    constructor(data) {
        super();
        this._name = data.name;
        this._category = data.category;
        this._range = data.range;
        this._maxlength = data.maxlength;
        this._onChangeCallback = data.onChangeCallback;
    }

    _onChange(e) {
        const currentValue = e.target.value;
        this._onChangeCallback(this._name, currentValue);
    }

    _getRenderAttributes() {
        const attributes = {};

        attributes.name = this._name;

        attributes.type = inputTypesMap.get(this._category);

        // number input range limits
        if (typeof this._range !== 'undefined') {
            attributes.min = this._range[0];
            attributes.max = this._range[1];
        }

        // text input string length limit
        if (typeof this._maxlength !== 'undefined') {
            attributes.maxLength = this._maxlength;
        }

        attributes.onChange = this._onChange.bind(this);

        return attributes;
    }

    render() {
        return React.createElement('input', this._getRenderAttributes());
    }
}

export default SpaceInput;
