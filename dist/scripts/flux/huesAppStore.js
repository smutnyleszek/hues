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

    var defaultSpace = 'rgb';

    var HuesAppStore = function () {
        function HuesAppStore() {
            _classCallCheck(this, HuesAppStore);

            this.name = defaultSpace;
            this.value = _colorverter2.default.getRandom[defaultSpace]();

            // TODO check if keep current space name?
            // TODO loop over spacesData map, keep all spaces values here

            this.bindListeners({
                _handleCurrentColorChange: _huesAppActions2.default.UPDATE_CURRENT_COLOR
            });
        }

        _createClass(HuesAppStore, [{
            key: '_handleCurrentColorChange',
            value: function _handleCurrentColorChange(newColor) {
                // TODO update all color spaces
                this.name = newColor.name;
                this.value = newColor.value;
            }
        }]);

        return HuesAppStore;
    }();

    exports.default = _myAlt2.default.createStore(HuesAppStore, 'HuesAppStore');
});