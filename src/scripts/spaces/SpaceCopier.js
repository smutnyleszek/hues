import React from 'react';
import ReactDom from 'react-dom';
import clipboardier from '../helpers/clipboardier';

class SpaceCopier extends React.Component {
    _onClick() {
        const spaceData = this.props.state.spaces.get(this.props.spaceName);
        let stringValue = spaceData.syntax.before;

        let propertyIndex = 0;
        spaceData.properties.forEach((propertyData) => {
            if (propertyIndex !== 0) {
                stringValue += spaceData.syntax.between;
            }
            stringValue += propertyData.value;
            propertyIndex++;
        });

        stringValue += spaceData.syntax.after;
        clipboardier.copy(stringValue);
    }

    componentDidMount() {
        // apply MADCSS module
        ReactDom.findDOMNode(this).setAttribute('i-button', '');
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
