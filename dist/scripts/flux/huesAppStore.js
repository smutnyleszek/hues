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
                _onSetSpacePropertyValue: _huesAppActions2.default.SET_SPACE_PROPERTY_VALUE
            });
        }

        _createClass(HuesAppStore, [{
            key: '_buildInitialState',
            value: function _buildInitialState() {
                // create all spaces objects
                this.spaces = new Map(_spacesData2.default);

                // apply initial value to spaces
                this._applyValuesToSpace(initialSpaceName, initialSpaceValue);
                this._applySpaceValueToOtherSpaces(initialSpaceName);
                console.log('_buildInitialState', this);
            }
        }, {
            key: '_applyValuesToSpace',
            value: function _applyValuesToSpace(targetSpaceName, valuesArray) {
                var targetSpaceData = this.spaces.get(targetSpaceName);

                var propertyIndex = 0;
                targetSpaceData.properties.forEach(function (propertyData) {
                    propertyData.value = valuesArray[propertyIndex];
                    propertyIndex++;
                });
            }
        }, {
            key: '_applySpaceValueToOtherSpaces',
            value: function _applySpaceValueToOtherSpaces(sourceSpaceName) {
                var _this = this;

                var sourceValuesArray = [];
                var sourceSpaceData = this.spaces.get(sourceSpaceName);
                sourceSpaceData.properties.forEach(function (propertyData) {
                    sourceValuesArray.push(propertyData.value);
                });

                this.spaces.forEach(function (spaceData, spaceName) {
                    if (spaceName === sourceSpaceName) {
                        return;
                    }
                    var newValuesArray = _colorverter2.default.convert[sourceSpaceName].to[spaceName](sourceValuesArray);
                    _this._applyValuesToSpace(spaceName, newValuesArray);
                });
            }
        }, {
            key: '_onSetSpacePropertyValue',
            value: function _onSetSpacePropertyValue(data) {
                var spaceData = this.spaces.get(data.spaceName);
                spaceData.properties.get(data.propertyName).value = data.newValue;
                this._applySpaceValueToOtherSpaces(data.spaceName);
            }
        }]);

        return HuesAppStore;
    }();

    exports.default = _myAlt2.default.createStore(HuesAppStore, 'HuesAppStore');
});