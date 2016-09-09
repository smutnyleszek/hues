import Helper from './Helper';
import React from 'react';
import ReactDom from 'react-dom';

console.log(new Helper('test'));

ReactDom.render(
    React.createElement('div', {label: 'test'}, 'Hello World!'),
    document.getElementById('app')
);
