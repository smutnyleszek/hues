import React from 'react';
import ReactDom from 'react-dom';
import clipboardier from '../helpers/clipboardier';

class SpaceCopier extends React.Component {
    _onClick() {
        const spaceData = this.props.state.spaces.get(this.props.spaceName);
        let stringValue = '';

        spaceData.properties.forEach((propertyData) => {
            if (propertyData.before) {
                stringValue += propertyData.before;
            }
            stringValue += propertyData.value;
            if (propertyData.after) {
                stringValue += propertyData.after;
            }
        });

        clipboardier.copy(stringValue);
    }

    componentDidMount() {
        // apply MADCSS modules
        ReactDom.findDOMNode(this).setAttribute('i-button', 'charcoal');
        ReactDom.findDOMNode(this).setAttribute('i-spaceCopier', '');
    }

    render() {
        return React.createElement(
            'button',
            {onClick: this._onClick.bind(this)},
            'copy'
        );
    }
}

export default SpaceCopier;
