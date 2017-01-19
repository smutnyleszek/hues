import React from 'react';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
    _getRenderAttributes() {
        return {
            name: this.props.name
        };
    }

    _getRenderChildren() {
        const spaceData = this.props.state.spaces.get(this.props.name);

        const children = [];

        children.push(spaceData.syntax.before);

        let propertyIndex = 0;
        spaceData.properties.forEach((propertyData, propertyName) => {
            if (propertyIndex !== 0) {
                children.push(spaceData.syntax.between);
            }
            children.push(React.createElement(SpaceInput, {
                key: `${this.props.name}-${propertyName}`,
                state: this.props.state,
                spaceName: this.props.name,
                propertyName: propertyName
            }));
            propertyIndex++;
        });

        children.push(spaceData.syntax.after);

        console.log('_getRenderChildren', this.props.name, children);

        return children;
    }

    render() {
        console.log('Space rendered - props:', this.props);
        return React.createElement(
            'div',
            this._getRenderAttributes(),
            this._getRenderChildren()
        );
    }
}

export default Space;
