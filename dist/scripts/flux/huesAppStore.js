define(['exports', './huesAppActions', '../helpers/colorverter', './myAlt', '../spaces/spacesData'], function (exports, _huesAppActions, _colorverter, _myAlt, _spacesData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _huesAppActions2 = _interopRequireDefault(_huesAppActions);

    var _colorverter2 = _interopRequireDefault(_colorverter);

    var _myAlt2 = _interopRequireDefault(_myAlt);

    var _spacesData2 = _interopRequireDefault(_spacesData);

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

    var initialSpaceName = 'rgb';
    var initialSpaceValue = _colorverter2.default.getRandom[initialSpaceName]();

    var HuesAppStore = function () {
        function HuesAppStore() {
            _classCallCheck(this, HuesAppStore);

            this._buildInitialState();
            this.bindListeners({
                _handleCurrentColorChange: _huesAppActions2.default.UPDATE_CURRENT_COLOR
            });
        }

        _createClass(HuesAppStore, [{
            key: '_buildInitialState',
            value: function _buildInitialState() {
                var _this = this;

                this.currentSpaceName = initialSpaceName;

                // create all spaces objects
                this.spaces = {};
                _spacesData2.default.forEach(function (spaceData, spaceName) {
                    _this.spaces[spaceName] = spaceData;
                    _this.spaces[spaceName].value = null;
                });

                // apply initial color to all spaces
                this._applyColorValueToSpaces(initialSpaceName, initialSpaceValue);
            }
        }, {
            key: '_applyColorValueToSpaces',
            value: function _applyColorValueToSpaces(sourceSpaceName, sourceSpaceValue) {
                var _this2 = this;

                _spacesData2.default.forEach(function (spaceData, spaceName) {
                    if (spaceName === sourceSpaceName) {
                        _this2.spaces[spaceName].value = sourceSpaceValue;
                    } else {
                        _this2.spaces[spaceName].value = _colorverter2.default.convert[sourceSpaceName].to[spaceName](sourceSpaceValue);
                    }
                });
            }
        }, {
            key: '_handleCurrentColorChange',
            value: function _handleCurrentColorChange(newColor) {
                this.currentSpaceName = newColor.name;
                this._applyColorValueToSpaces(newColor.name, newColor.value);
            }
        }]);

        return HuesAppStore;
    }();

    exports.default = _myAlt2.default.createStore(HuesAppStore, 'HuesAppStore');
});