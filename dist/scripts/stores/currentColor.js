define(['exports', '../actions/myActions', '../myAlt'], function (exports, _myActions, _myAlt) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _myActions2 = _interopRequireDefault(_myActions);

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

            this.spaceId = null;
            this.colorValue = null;

            this.bindListeners({
                handleCurrentColorChange: _myActions2.default.UPDATE_CURRENT_COLOR
            });
        }

        _createClass(CurrentColorStore, [{
            key: 'handleCurrentColorChange',
            value: function handleCurrentColorChange(newColor) {
                this.spaceId = newColor.spaceId;
                this.colorValue = newColor.value;
            }
        }]);

        return CurrentColorStore;
    }();

    exports.default = _myAlt2.default.createStore(CurrentColorStore, 'CurrentColorStore');
});