import React from 'react';
import SpaceCopier from './SpaceCopier';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
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
