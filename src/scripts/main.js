import CurrentColor from 'components/CurrentColor';
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
    React.createElement(CurrentColor),
    document.getElementById('app')
);
