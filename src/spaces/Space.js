import React from 'react';
import SpaceCopier from './SpaceCopier';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
    _getRenderChildren() {
        const spaceData = this.props.state.spaces.get(this.props.name);

        const children = [];

        spaceData.properties.forEach((propertyData, propertyName) => {
            if (propertyData.before) {
                children.push(propertyData.before);
            }
            children.push(React.createElement(SpaceInput, {
                key: `${this.props.name}-${propertyName}`,
                state: this.props.state,
                spaceName: this.props.name,
                propertyName: propertyName
            }));
            if (propertyData.after) {
                children.push(propertyData.after);
            }
        });

        children.push(React.createElement(SpaceCopier, {
            key: `${this.props.name}-copier`,
            state: this.props.state,
            spaceName: this.props.name
        }));

        return children;
    }

    render() {
        return React.createElement(
            'div',
            {name: this.props.name},
            this._getRenderChildren()
        );
    }
}

export default Space;
