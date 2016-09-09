define(['./Helper', 'react', 'react-dom'], function (_Helper, _react, _reactDom) {
    'use strict';

    var _Helper2 = _interopRequireDefault(_Helper);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    console.log(new _Helper2.default('test'));

    _reactDom2.default.render(_react2.default.createElement('div', { label: 'test' }, 'Hello World!'), document.getElementById('app'));
});