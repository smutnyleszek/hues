define(['exports', '../flux/huesAppActions', 'react', './SpaceInput'], function (exports, _huesAppActions, _react, _SpaceInput) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _huesAppActions2 = _interopRequireDefault(_huesAppActions);

    var _react2 = _interopRequireDefault(_react);

    var _SpaceInput2 = _interopRequireDefault(_SpaceInput);

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

    var Space = function (_React$Component) {
        _inherits(Space, _React$Component);

        function Space(data) {
            _classCallCheck(this, Space);

            var _this = _possibleConstructorReturn(this, (Space.__proto__ || Object.getPrototypeOf(Space)).call(this));

            _this._name = data.name;
            _this._syntax = data.syntax;
            _this._properties = data.properties;
            return _this;
        }

        _createClass(Space, [{
            key: '_createInput',
            value: function _createInput(propertyData) {
                return _react2.default.createElement(_SpaceInput2.default, {
                    name: propertyData.name,
                    category: propertyData.category,
                    maxlength: propertyData.maxlength,
                    range: propertyData.range,
                    onChangeCallback: this._onInputChange.bind(this)
                });
            }
        }, {
            key: '_setPropertyValue',
            value: function _setPropertyValue(propertyName, value) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var property = _step.value;

                        if (property.name === propertyName) {
                            property.value = value;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: '_getPropertiesValuesArray',
            value: function _getPropertiesValuesArray() {
                var values = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var property = _step2.value;

                        values.push(property.value);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return values;
            }
        }, {
            key: '_onInputChange',
            value: function _onInputChange(inputName, newVal) {
                this._setPropertyValue(inputName, newVal);
                _huesAppActions2.default.updateCurrentColor({
                    name: this._name,
                    value: this._getPropertiesValuesArray()
                });
            }
        }, {
            key: '_getRenderAttributes',
            value: function _getRenderAttributes() {
                return {
                    name: this._name
                };
            }
        }, {
            key: 'render',
            value: function render() {
                console.log('Space rendered - state:', this.props.state);
                // TODO apply state values to input value
                return _react2.default.createElement('div', this._getRenderAttributes(), this._syntax.before, this._createInput(this._properties[0]), this._syntax.between, this._createInput(this._properties[1]), this._syntax.between, this._createInput(this._properties[2]), this._syntax.after);
            }
        }]);

        return Space;
    }(_react2.default.Component);

    exports.default = Space;
});