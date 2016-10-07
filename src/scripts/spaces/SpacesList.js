import React from 'react';
import Space from './Space';
import spacesData from './spacesData';

class SpacesList extends React.Component {
    constructor() {
        super();
        console.log('new SpacesList!');
    }

    _createSpace(id) {
        const spaceData = spacesData.get(id);
        const data = {
            id: id,
            properties: spaceData.properties,
            syntax: spaceData.syntax
        };
        return React.createElement(Space, data);
    }

    render() {
        return React.createElement(
            'div',
            null,
            this._createSpace('hex'),
            this._createSpace('rgb'),
            this._createSpace('hsl'),
            this._createSpace('hwb')
        );
    }
}

export default SpacesList;
