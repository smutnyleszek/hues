define(['exports', '../flux/huesAppActions', 'react', '../helpers/deepFreeze'], function (exports, _huesAppActions, _react, _deepFreeze) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _huesAppActions2 = _interopRequireDefault(_huesAppActions);

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

        function SpaceInput() {
            _classCallCheck(this, SpaceInput);

            return _possibleConstructorReturn(this, (SpaceInput.__proto__ || Object.getPrototypeOf(SpaceInput)).apply(this, arguments));
        }

        _createClass(SpaceInput, [{
            key: '_onChange',
            value: function _onChange(changeEvent) {
                _huesAppActions2.default.setSpacePropertyValue({
                    spaceName: this.props.spaceName,
                    propertyName: this.props.propertyName,
                    newValue: changeEvent.target.value
                });
            }
        }, {
            key: '_getRenderAttributes',
            value: function _getRenderAttributes() {
                var attributes = {};
                var spaceData = this.props.state.spaces.get(this.props.spaceName);
                var propertyData = spaceData.properties.get(this.props.propertyName);

                attributes.name = this.props.propertyName;

                attributes.value = propertyData.value;

                attributes.type = inputTypesMap.get(propertyData.category);

                // number input range limits
                if (typeof propertyData.range !== 'undefined') {
                    attributes.min = propertyData.range[0];
                    attributes.max = propertyData.range[1];
                    attributes.step = 1;
                }

                // text input string length limit
                if (typeof propertyData.maxlength !== 'undefined') {
                    attributes.maxLength = propertyData.maxlength;
                }

                attributes.onChange = this._onChange.bind(this);

                return attributes;
            }
        }, {
            key: 'render',
            value: function render() {
                console.log('SpaceInput render - props', this.props);
                return _react2.default.createElement('input', this._getRenderAttributes());
            }
        }]);

        return SpaceInput;
    }(_react2.default.Component);

    exports.default = SpaceInput;
});