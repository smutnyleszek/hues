define(['components/CurrentColor', 'react', 'react-dom', 'data/spaces'], function (_CurrentColor, _react, _reactDom, _spaces) {
    'use strict';

    var _CurrentColor2 = _interopRequireDefault(_CurrentColor);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _spaces2 = _interopRequireDefault(_spaces);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    console.log(_spaces2.default);

    _reactDom2.default.render(_react2.default.createElement(_CurrentColor2.default), document.getElementById('app'));
});