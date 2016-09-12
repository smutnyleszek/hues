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

    var SomeComponent = _react2.default.createClass({
        displayName: 'Some component',
        render: function render() {
            return _react2.default.createElement('div', { is: '', 'i-o-test': 'test' }, 'Hi!');
        }
    });

    var componentInstance = _react2.default.createElement(SomeComponent);

    _reactDom2.default.render(componentInstance, document.getElementById('app'));
});