define(['react', 'react-dom', 'spaces/SpacesList'], function (_react, _reactDom, _SpacesList) {
    'use strict';

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _SpacesList2 = _interopRequireDefault(_SpacesList);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _reactDom2.default.render(_react2.default.createElement(_SpacesList2.default), document.getElementById('app'));
});