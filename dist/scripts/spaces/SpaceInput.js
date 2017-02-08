define(['exports', '../flux/huesAppActions', 'react', '../helpers/colorverter'], function (exports, _huesAppActions, _react, _colorverter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _huesAppActions2 = _interopRequireDefault(_huesAppActions);

    var _react2 = _interopRequireDefault(_react);

    var _colorverter2 = _interopRequireDefault(_colorverter);

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

    var SpaceInput = function (_React$Component) {
        _inherits(SpaceInput, _React$Component);

        function SpaceInput() {
            _classCallCheck(this, SpaceInput);

            return _possibleConstructorReturn(this, (SpaceInput.__proto__ || Object.getPrototypeOf(SpaceInput)).apply(this, arguments));
        }

        _createClass(SpaceInput, [{
            key: '_onChange',
            value: function _onChange(changeEvent) {
                this._applyNewValue(changeEvent.target.value);
            }
        }, {
            key: '_onKeyDown',
            value: function _onKeyDown(keyDownEvent) {
                switch (keyDownEvent.key) {
                    case 'ArrowUp':
                        this._changeValueByNumber(1);
                        keyDownEvent.preventDefault();
                        break;
                    case 'ArrowDown':
                        this._changeValueByNumber(-1);
                        keyDownEvent.preventDefault();
                        break;
                    default:
                        return;
                }
            }
        }, {
            key: '_changeValueByNumber',
            value: function _changeValueByNumber(number) {
                var propertyData = this._getPropertyData();
                var minValue = propertyData.range[0];
                var maxValue = propertyData.range[1];
                var newValue = propertyData.value;

                // STEP 1: get integer
                if (propertyData.category === 'integer') {
                    newValue = parseInt(newValue, 10);
                } else if (propertyData.category === 'hexadecimal') {
                    newValue = _colorverter2.default.hexToInt(newValue);
                }

                // STEP 2: add number to it
                newValue += number;

                // STEP 3: fix by range limits
                if (newValue > maxValue) {
                    newValue = maxValue;
                } else if (newValue < minValue) {
                    newValue = minValue;
                }

                // STEP 4: change it back to proper type if necessary
                if (propertyData.category === 'hexadecimal') {
                    newValue = _colorverter2.default.intToHex(newValue);
                }

                this._applyNewValue(newValue);
            }
        }, {
            key: '_applyNewValue',
            value: function _applyNewValue(newValue) {
                _huesAppActions2.default.setSpacePropertyValue({
                    spaceName: this.props.spaceName,
                    propertyName: this.props.propertyName,
                    newValue: newValue
                });
            }
        }, {
            key: '_getPropertyData',
            value: function _getPropertyData() {
                var spaceData = this.props.state.spaces.get(this.props.spaceName);
                return spaceData.properties.get(this.props.propertyName);
            }
        }, {
            key: '_getRenderAttributes',
            value: function _getRenderAttributes() {
                var attributes = {};
                var propertyData = this._getPropertyData();

                attributes.name = this.props.propertyName;
                attributes.value = propertyData.value;
                attributes.type = 'text';

                // disable attributes whitelist and apply styles module
                attributes.is = '';
                attributes['i-input'] = 'space';

                attributes.onChange = this._onChange.bind(this);
                attributes.onKeyDown = this._onKeyDown.bind(this);

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