import HuesAppActions from '../flux/huesAppActions';
import React from 'react';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
    constructor(data) {
        super();
        this._name = data.name;
        this._syntax = data.syntax;
        this._properties = data.properties;
    }

    _createInput(propertyData) {
        return React.createElement(SpaceInput, {
            name: propertyData.name,
            category: propertyData.category,
            maxlength: propertyData.maxlength,
            range: propertyData.range,
            onChangeCallback: this._onInputChange.bind(this)
        });
    }

    _setPropertyValue(propertyName, value) {
        for (const property of this._properties) {
            if (property.name === propertyName) {
                property.value = value;
                break;
            }
        }
    }

    _getPropertiesValuesArray() {
        const values = [];
        for (const property of this._properties) {
            values.push(property.value);
        }
        return values;
    }

    _onInputChange(inputName, newVal) {
        this._setPropertyValue(inputName, newVal);
        HuesAppActions.updateCurrentColor({
            name: this._name,
            value: this._getPropertiesValuesArray()
        });
    }

    _getRenderAttributes() {
        return {
            name: this._name
        };
    }

    render() {
        console.log('Space rendered - state:', this.props.state);
        // TODO apply state values to input value
        return React.createElement(
            'div',
            this._getRenderAttributes(),
            this._syntax.before,
            this._createInput(this._properties[0]),
            this._syntax.between,
            this._createInput(this._properties[1]),
            this._syntax.between,
            this._createInput(this._properties[2]),
            this._syntax.after
        );
    }
}

export default Space;
