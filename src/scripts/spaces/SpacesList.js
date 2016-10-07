import React from 'react';
import Space from './Space';

class SpacesList extends React.Component {
    constructor() {
        super();
        console.log('new SpacesList!');
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Space, {foo: 1}),
            React.createElement(Space, {foo: 2}),
            React.createElement(Space, {foo: 3}),
            React.createElement(Space, {foo: 4})
        );
    }
}

export default SpacesList;
