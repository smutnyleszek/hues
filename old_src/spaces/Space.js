import React from 'react';
import SpaceCopier from './SpaceCopier';
import SpaceInput from './SpaceInput';

class Space extends React.Component {
  _getRenderChildren() {
    const spaceData = this.props.state.spaces.get(this.props.spaceName);

    const children = [];

    spaceData.properties.forEach((propertyData, propertyName) => {
      if (propertyData.before) {
        children.push(propertyData.before);
      }
      children.push(React.createElement(SpaceInput, {
        key: `${this.props.spaceName}-${propertyName}`,
        state: this.props.state,
        spaceName: this.props.spaceName,
        propertyName: propertyName
      }));
      if (propertyData.after) {
        children.push(propertyData.after);
      }
    });

    children.push(React.createElement(SpaceCopier, {
      key: `${this.props.spaceName}-copier`,
      state: this.props.state,
      spaceName: this.props.spaceName
    }));

    return children;
  }

  render() {
    return React.createElement(
      'div',
      {name: this.props.spaceName},
      this._getRenderChildren()
    );
  }
}

export default Space;
