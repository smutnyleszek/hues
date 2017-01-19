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
                this.currentSpaceName = initialSpaceName;

                // create all spaces objects
                this.spaces = new Map(_spacesData2.default);

                // TODO make a function for setting intial value on initialSpace with
                // different mechanism (one that will update all 3 at once and then
                // trigger conversion on other spaces)
                this._applyColorValueToSpaces(initialSpaceName, initialSpaceValue);

                console.log('_buildInitialState', this);
            }
        }, {
            key: '_applyColorValueToSpaces',
            value: function _applyColorValueToSpaces(sourceSpaceName, sourceSpaceValue) {
                console.log('_applyColorValueToSpaces', sourceSpaceName, sourceSpaceValue);
                this.spaces.forEach(function (spaceData, spaceName) {
                    var newValue = sourceSpaceValue;
                    if (spaceName !== sourceSpaceName) {
                        newValue = _colorverter2.default.convert[sourceSpaceName].to[spaceName](sourceSpaceValue);
                    }

                    var propertyIndex = 0;
                    spaceData.properties.forEach(function (propertyData) {
                        propertyData.value = newValue[propertyIndex];
                        propertyIndex++;
                    });
                });
            }
        }, {
            key: '_onSetSpacePropertyValue',
            value: function _onSetSpacePropertyValue(data) {
                this.currentSpaceName = data.spaceName;

                var spaceData = this.spaces.get(data.spaceName);
                spaceData.properties.get(data.propertyName).value = data.newValue;

                // TODO make a function that will just require spaceName that changed,
                // and will convert other spaces values by it (dont use arrays, please!)
                var valueArray = [];
                spaceData.properties.forEach(function (propertyData, propertyName) {
                    valueArray.push(propertyData.value);
                });

                this._applyColorValueToSpaces(data.spaceName, valueArray);
            }
        }]);

        return HuesAppStore;
    }();

    exports.default = _myAlt2.default.createStore(HuesAppStore, 'HuesAppStore');
});