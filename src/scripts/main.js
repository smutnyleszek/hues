import CurrentColor from 'components/CurrentColor';
import React from 'react';
import ReactDom from 'react-dom';
import colorverter from 'helpers/colorverter';
import spacesData from 'data/spaces';

console.log(spacesData);

window.colorverter = colorverter;

ReactDom.render(
    React.createElement(CurrentColor),
    document.getElementById('app')
);
