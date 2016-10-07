define(['exports', 'react', './SpaceInput'], function (exports, _react, _SpaceInput) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

            _this.id = data.id;
            _this.syntax = data.syntax;
            _this.properties = data.properties;
            return _this;
        }

        _createClass(Space, [{
            key: '_createInput',
            value: function _createInput(propertyData) {
                var data = {
                    id: propertyData.id,
                    category: propertyData.category,
                    maxlength: propertyData.maxlength,
                    range: propertyData.range,
                    onChangeCallback: this._onInputChange.bind(this)
                };
                return _react2.default.createElement(_SpaceInput2.default, data);
            }
        }, {
            key: '_onInputChange',
            value: function _onInputChange(inputId, newVal) {
                console.log('space -- input change!', inputId, newVal);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('div', null, this.syntax.before, this._createInput(this.properties[0]), this.syntax.between, this._createInput(this.properties[1]), this.syntax.between, this._createInput(this.properties[2]), this.syntax.after);
            }
        }]);

        return Space;
    }(_react2.default.Component);

    exports.default = Space;
});