import HuesAppActions from '../flux/huesAppActions';
import React from 'react';
import colorverter from '../helpers/colorverter'

class SpaceInput extends React.Component {
    _onChange(changeEvent) {
        this._applyNewValue(changeEvent.target.value);
    }

    _onKeyDown(keyDownEvent) {
        switch (keyDownEvent.key) {
            case 'ArrowUp':
                this._changeValueByNumber(1);
                keyDownEvent.preventDefault();
                break;
            case 'ArrowDown':
                this._changeValueByNumber(-1);
                keyDownEvent.preventDefault();
                break;
            default:
                return;
        }
    }

    _changeValueByNumber(number) {
        const propertyData = this._getPropertyData();
        const minValue = propertyData.range[0];
        const maxValue = propertyData.range[1];
        let newValue = propertyData.value;

        // STEP 1: get integer
        if (propertyData.category === 'integer') {
            newValue = parseInt(newValue, 10);
        } else if (propertyData.category === 'hexadecimal') {
            newValue = colorverter.hexToInt(newValue);
        }

        // STEP 2: add number to it
        newValue += number;

        // STEP 3: fix by range limits
        if (newValue > maxValue) {
            newValue = maxValue;
        } else if (newValue < minValue) {
            newValue = minValue;
        }

        // STEP 4: change it back to proper type if necessary
        if (propertyData.category === 'hexadecimal') {
            newValue = colorverter.intToHex(newValue);
        }

        this._applyNewValue(newValue);
    }

    _applyNewValue(newValue) {
        HuesAppActions.setSpacePropertyValue({
            spaceName: this.props.spaceName,
            propertyName: this.props.propertyName,
            newValue: newValue
        });
    }

    _getPropertyData() {
        const spaceData = this.props.state.spaces.get(this.props.spaceName);
        return spaceData.properties.get(this.props.propertyName);
    }

    _getRenderAttributes() {
        const attributes = {};
        const propertyData = this._getPropertyData();

        attributes.name = this.props.propertyName;
        attributes.value = propertyData.value;
        attributes.type = 'text';

        // disable attributes whitelist and apply styles module
        attributes.is = '';
        attributes['i-input'] = 'space';

        attributes.onChange = this._onChange.bind(this);
        attributes.onKeyDown = this._onKeyDown.bind(this);

        return attributes;
    }

    render() {
        console.log('SpaceInput render - props', this.props);
        return React.createElement('input', this._getRenderAttributes());
    }
}

export default SpaceInput;
