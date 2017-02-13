define(['exports', 'react', 'react-dom', '../helpers/clipboardier'], function (exports, _react, _reactDom, _clipboardier) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _clipboardier2 = _interopRequireDefault(_clipboardier);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var SpaceCopier = function (_React$Component) {
        _inherits(SpaceCopier, _React$Component);

        function SpaceCopier() {
            _classCallCheck(this, SpaceCopier);

            return _possibleConstructorReturn(this, (SpaceCopier.__proto__ || Object.getPrototypeOf(SpaceCopier)).apply(this, arguments));
        }

        _createClass(SpaceCopier, [{
            key: '_onClick',
            value: function _onClick() {
                var spaceData = this.props.state.spaces.get(this.props.spaceName);
                var stringValue = spaceData.syntax.before;

                var propertyIndex = 0;
                spaceData.properties.forEach(function (propertyData) {
                    if (propertyIndex !== 0) {
                        stringValue += spaceData.syntax.between;
                    }
                    stringValue += propertyData.value;
                    propertyIndex++;
                });

                stringValue += spaceData.syntax.after;
                _clipboardier2.default.copy(stringValue);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                // apply MADCSS module
                _reactDom2.default.findDOMNode(this).setAttribute('i-button', 'charcoal');
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('button', { onClick: this._onClick.bind(this) }, 'copy');
            }
        }]);

        return SpaceCopier;
    }(_react2.default.Component);

    exports.default = SpaceCopier;
});