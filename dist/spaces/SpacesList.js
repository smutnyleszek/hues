define(['exports', '../flux/huesAppStore', 'react', 'react-dom', './Space'], function (exports, _huesAppStore, _react, _reactDom, _Space) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _huesAppStore2 = _interopRequireDefault(_huesAppStore);

    var _react2 = _interopRequireDefault(_react);

    var _reactDom2 = _interopRequireDefault(_reactDom);

    var _Space2 = _interopRequireDefault(_Space);

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

    var SpacesList = function (_React$Component) {
        _inherits(SpacesList, _React$Component);

        function SpacesList() {
            _classCallCheck(this, SpacesList);

            var _this = _possibleConstructorReturn(this, (SpacesList.__proto__ || Object.getPrototypeOf(SpacesList)).call(this));

            _this.state = _huesAppStore2.default.getState();
            return _this;
        }

        _createClass(SpacesList, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                _huesAppStore2.default.listen(this.onHuesAppStoreChange.bind(this));
                // apply MADCSS module
                _reactDom2.default.findDOMNode(this).setAttribute('i-spacesList', '');
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                _huesAppStore2.default.unlisten(this.onHuesAppStoreChange.bind(this));
            }
        }, {
            key: 'onHuesAppStoreChange',
            value: function onHuesAppStoreChange(currentColor) {
                // NOTE: setState is asynchronous, so if you need access for current
                // state, do it in componentDidUpdate
                this.setState(currentColor);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                console.debug('state changed:', this.state);
            }
        }, {
            key: 'createSpace',
            value: function createSpace(spaceName) {
                return _react2.default.createElement(_Space2.default, {
                    spaceName: spaceName,
                    state: this.state
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement('div', null, this.createSpace('rgb'), this.createSpace('hex'), this.createSpace('hsl'), this.createSpace('hwb'));
            }
        }]);

        return SpacesList;
    }(_react2.default.Component);

    exports.default = SpacesList;
});