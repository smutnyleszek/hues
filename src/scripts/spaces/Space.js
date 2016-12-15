import CurrentColorActions from '../flux/currentColorActions';
import CurrentColorStore from '../flux/currentColorStore';
import React from 'react';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
    constructor(data) {
        super();
        this._name = data.name;
        this._syntax = data.syntax;
        this._properties = data.properties;
        this.state = CurrentColorStore.getState();
    }

    componentDidMount() {
        CurrentColorStore.listen(this._onCurrentColorChange.bind(this));
    }

    componentWillUnmount() {
        CurrentColorStore.unlisten(this._onCurrentColorChange.bind(this));
    }

    _onCurrentColorChange(state) {
        this.setState(state);
        console.log('current color changed', state);
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

    _onInputChange(inputId, newVal) {
        console.log('space -- input change!', inputId, newVal);
        console.log(this);
        CurrentColorActions.updateCurrentColor({
            name: this._name,
            value: []
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
