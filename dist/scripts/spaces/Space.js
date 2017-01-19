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

        function Space() {
            _classCallCheck(this, Space);

            return _possibleConstructorReturn(this, (Space.__proto__ || Object.getPrototypeOf(Space)).apply(this, arguments));
        }

        _createClass(Space, [{
            key: '_getRenderAttributes',
            value: function _getRenderAttributes() {
                return {
                    name: this.props.name
                };
            }
        }, {
            key: '_getRenderChildren',
            value: function _getRenderChildren() {
                var _this2 = this;

                var spaceData = this.props.state.spaces.get(this.props.name);

                var children = [];

                children.push(spaceData.syntax.before);

                var propertyIndex = 0;
                spaceData.properties.forEach(function (propertyData, propertyName) {
                    if (propertyIndex !== 0) {
                        children.push(spaceData.syntax.between);
                    }
                    children.push(_react2.default.createElement(_SpaceInput2.default, {
                        key: _this2.props.name + '-' + propertyName,
                        state: _this2.props.state,
                        spaceName: _this2.props.name,
                        propertyName: propertyName
                    }));
                    propertyIndex++;
                });

                children.push(spaceData.syntax.after);

                console.log('_getRenderChildren', this.props.name, children);

                return children;
            }
        }, {
            key: 'render',
            value: function render() {
                console.log('Space rendered - props:', this.props);
                return _react2.default.createElement('div', this._getRenderAttributes(), this._getRenderChildren());
            }
        }]);

        return Space;
    }(_react2.default.Component);

    exports.default = Space;
});