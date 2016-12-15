define(['exports', 'react', '../helpers/deepFreeze'], function (exports, _react, _deepFreeze) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

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

    var inputTypesMap = (0, _deepFreeze2.default)(new Map([['hexadecimal', 'text'], ['integer', 'number']]));

    var SpaceInput = function (_React$Component) {
        _inherits(SpaceInput, _React$Component);

        function SpaceInput(data) {
            _classCallCheck(this, SpaceInput);

            var _this = _possibleConstructorReturn(this, (SpaceInput.__proto__ || Object.getPrototypeOf(SpaceInput)).call(this));

            _this._name = data.name;
            _this._category = data.category;
            _this._range = data.range;
            _this._maxlength = data.maxlength;
            _this._onChangeCallback = data.onChangeCallback;
            return _this;
        }

        _createClass(SpaceInput, [{
            key: '_onChange',
            value: function _onChange(e) {
                var currentValue = e.target.value;
                this._onChangeCallback(this._name, currentValue);
            }
        }, {
            key: '_getRenderAttributes',
            value: function _getRenderAttributes() {
                var attributes = {};

                attributes.name = this._name;

                attributes.type = inputTypesMap.get(this._category);

                // number input range limits
                if (typeof this._range !== 'undefined') {
                    attributes.min = this._range[0];
                    attributes.max = this._range[1];
                }

                // text input string length limit
                if (typeof this._maxlength !== 'undefined') {
                    attributes.maxLength = this._maxlength;
                }

                attributes.onChange = this._onChange.bind(this);

                return attributes;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('input', this._getRenderAttributes());
            }
        }]);

        return SpaceInput;
    }(_react2.default.Component);

    exports.default = SpaceInput;
});