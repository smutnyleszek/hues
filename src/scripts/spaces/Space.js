import React from 'react';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
    constructor(data) {
        super();
        this.id = data.id;
        this.syntax = data.syntax;
        this.properties = data.properties;
    }

    _createInput(propertyData) {
        const data = {
            id: propertyData.id,
            category: propertyData.category,
            maxlength: propertyData.maxlength,
            range: propertyData.range,
            onChangeCallback: this._onInputChange.bind(this)
        };
        return React.createElement(SpaceInput, data);
    }

    _onInputChange(inputId, newVal) {
        console.log('space -- input change!', inputId, newVal);
    }

    render() {
        return React.createElement(
            'div',
            null,
            this.syntax.before,
            this._createInput(this.properties[0]),
            this.syntax.between,
            this._createInput(this.properties[1]),
            this.syntax.between,
            this._createInput(this.properties[2]),
            this.syntax.after
        );
    }
}

export default Space;
