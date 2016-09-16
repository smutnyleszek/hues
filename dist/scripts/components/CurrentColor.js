define(['exports', '../stores/myStore', 'react'], function (exports, _myStore, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _myStore2 = _interopRequireDefault(_myStore);

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var CurrentColor = _react2.default.createClass({
        getInitialState: function getInitialState() {
            return _myStore2.default.getState();
        },
        componentDidMount: function componentDidMount() {
            _myStore2.default.listen(this.onChange);
        },
        componentWillUnmount: function componentWillUnmount() {
            _myStore2.default.unlisten(this.onChange);
        },
        onChange: function onChange(state) {
            this.setState(state);
        },


        displayName: 'current color',
        render: function render() {
            return _react2.default.createElement('div', {}, 'Current color:' + this.state.currentColor);
        }
    });

    exports.default = CurrentColor;
});