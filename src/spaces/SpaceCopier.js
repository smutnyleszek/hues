import React from 'react';
import ReactDom from 'react-dom';
import clipboardier from '../common/clipboardier';
import colorFormatter from '../common/colorFormatter';

class SpaceCopier extends React.Component {
    _onClick() {
        const spaceData = this.props.state.spaces.get(this.props.spaceName);
        clipboardier.copy(colorFormatter.get(spaceData));
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
