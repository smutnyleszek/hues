define(['exports', '../stores/currentColor', 'react'], function (exports, _currentColor, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _currentColor2 = _interopRequireDefault(_currentColor);

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var CurrentColor = _react2.default.createClass({
        getInitialState: function getInitialState() {
            return _currentColor2.default.getState();
        },
        componentDidMount: function componentDidMount() {
            _currentColor2.default.listen(this.onChange);
        },
        componentWillUnmount: function componentWillUnmount() {
            _currentColor2.default.unlisten(this.onChange);
        },
        onChange: function onChange(state) {
            this.setState(state);
        },


        displayName: 'current-color',

        render: function render() {
            return _react2.default.createElement('div', {}, 'Current color: ' + this.state.colorValue);
        }
    });

    exports.default = CurrentColor;
});