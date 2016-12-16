define(['exports', './currentColorActions', '../helpers/colorverter', './myAlt'], function (exports, _currentColorActions, _colorverter, _myAlt) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _currentColorActions2 = _interopRequireDefault(_currentColorActions);

    var _colorverter2 = _interopRequireDefault(_colorverter);

    var _myAlt2 = _interopRequireDefault(_myAlt);

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

    var CurrentColorStore = function () {
        function CurrentColorStore() {
            _classCallCheck(this, CurrentColorStore);

            this.name = 'rgb';
            this.value = _colorverter2.default.getRandomRgb();

            this.bindListeners({
                _handleCurrentColorChange: _currentColorActions2.default.UPDATE_CURRENT_COLOR
            });
        }

        _createClass(CurrentColorStore, [{
            key: '_handleCurrentColorChange',
            value: function _handleCurrentColorChange(newColor) {
                this.name = newColor.name;
                this.value = newColor.value;
            }
        }]);

        return CurrentColorStore;
    }();

    exports.default = _myAlt2.default.createStore(CurrentColorStore, 'CurrentColorStore');
});