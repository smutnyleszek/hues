import CurrentColor from 'components/CurrentColor';
import React from 'react';
import ReactDom from 'react-dom';
import spacesData from 'data/spaces';

console.log(spacesData);

ReactDom.render(
    React.createElement(CurrentColor),
    document.getElementById('app')
);
