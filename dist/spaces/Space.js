define(['exports', 'react', './SpaceCopier', './SpaceInput'], function (exports, _react, _SpaceCopier, _SpaceInput) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _SpaceCopier2 = _interopRequireDefault(_SpaceCopier);

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
            key: '_getRenderChildren',
            value: function _getRenderChildren() {
                var _this2 = this;

                var spaceData = this.props.state.spaces.get(this.props.spaceName);

                var children = [];

                spaceData.properties.forEach(function (propertyData, propertyName) {
                    if (propertyData.before) {
                        children.push(propertyData.before);
                    }
                    children.push(_react2.default.createElement(_SpaceInput2.default, {
                        key: _this2.props.spaceName + '-' + propertyName,
                        state: _this2.props.state,
                        spaceName: _this2.props.spaceName,
                        propertyName: propertyName
                    }));
                    if (propertyData.after) {
                        children.push(propertyData.after);
                    }
                });

                children.push(_react2.default.createElement(_SpaceCopier2.default, {
                    key: this.props.spaceName + '-copier',
                    state: this.props.state,
                    spaceName: this.props.spaceName
                }));

                return children;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('div', { name: this.props.spaceName }, this._getRenderChildren());
            }
        }]);

        return Space;
    }(_react2.default.Component);

    exports.default = Space;
});