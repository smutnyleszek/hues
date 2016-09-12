import Helper from './Helper';
import React from 'react';
import ReactDom from 'react-dom';

console.log(new Helper('test'));

const SomeComponent = React.createClass({
    displayName: 'Some component',
    render() {
        return React.createElement('div', {is: '', 'i-o-test': 'test'}, 'Hi!');
    }
});

const componentInstance = React.createElement(SomeComponent);

ReactDom.render(
    componentInstance,
    document.getElementById('app')
);
