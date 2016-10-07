import React from 'react';

class Space extends React.Component {
    constructor(spaceData) {
        super();
        this.spaceId = 'hi';
        console.log('new Space!', spaceData);
    }

    render() {
        return React.createElement(
            'div',
            {},
            `Space: ${this.spaceId}`
        );
    }
}

export default Space;
