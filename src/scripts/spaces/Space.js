import CurrentColorActions from '../flux/currentColorActions';
import CurrentColorStore from '../flux/currentColorStore';
import React from 'react';
import SpaceInput from './SpaceInput';
import colorverter from '../helpers/colorverter';

class Space extends React.Component {
    constructor(data) {
        super();
        this._name = data.name;
        this._syntax = data.syntax;
        this._properties = data.properties;

        this._onCurrentColorChange(CurrentColorStore.getState());
    }

    componentDidMount() {
        CurrentColorStore.listen(this._onCurrentColorChange.bind(this));
    }

    componentWillUnmount() {
        CurrentColorStore.unlisten(this._onCurrentColorChange.bind(this));
    }

    _onCurrentColorChange(currentColor) {
        console.log(this._name, 'current color changed', currentColor);
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
        CurrentColorActions.updateCurrentColor({
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
