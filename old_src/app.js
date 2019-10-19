import React from 'react';
import ReactDom from 'react-dom';
import SpacesList from 'spaces/SpacesList';

ReactDom.render(
  React.createElement(SpacesList),
  document.querySelector('[js-huesAppRoot]')
);
