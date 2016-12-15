define(['exports', '../flux/currentColorActions', '../flux/currentColorStore', 'react', './SpaceInput'], function (exports, _currentColorActions, _currentColorStore, _react, _SpaceInput) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _currentColorActions2 = _interopRequireDefault(_currentColorActions);

    var _currentColorStore2 = _interopRequireDefault(_currentColorStore);

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
            _this.state = _currentColorStore2.default.getState();
            return _this;
        }

        _createClass(Space, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                _currentColorStore2.default.listen(this._onCurrentColorChange.bind(this));
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _currentColorStore2.default.unlisten(this._onCurrentColorChange.bind(this));
            }
        }, {
            key: '_onCurrentColorChange',
            value: function _onCurrentColorChange(state) {
                this.setState(state);
                console.log('current color changed', state);
            }
        }, {
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
            key: '_onInputChange',
            value: function _onInputChange(inputId, newVal) {
                console.log('space -- input change!', inputId, newVal);
                console.log(this);
                _currentColorActions2.default.updateCurrentColor({
                    name: this._name,
                    value: []
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
                return _react2.default.createElement('div', this._getRenderAttributes(), this._syntax.before, this._createInput(this._properties[0]), this._syntax.between, this._createInput(this._properties[1]), this._syntax.between, this._createInput(this._properties[2]), this._syntax.after);
            }
        }]);

        return Space;
    }(_react2.default.Component);

    exports.default = Space;
});