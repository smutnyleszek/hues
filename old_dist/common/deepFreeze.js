define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  // -----------------------------------------------------------------------------
  // deepFreeze -- deeply (includes nested) freezes objects, Maps and Sets.
  // -----------------------------------------------------------------------------

  function deepFreeze(obj) {
    if (obj instanceof Map) {
      obj.clear = obj.delete = obj.set = function () {
        throw new Error('map is read-only');
      };
    } else if (obj instanceof Set) {
      obj.add = obj.clear = obj.delete = function () {
        throw new Error('set is read-only');
      };
    }

    // Freeze self
    Object.freeze(obj);

    Reflect.ownKeys(obj).forEach(function (propName) {
      var prop = obj[propName];

      // Freeze prop if it is an object
      if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' && !Object.isFrozen(prop)) {
        deepFreeze(prop);
      }
    });

    return obj;
  }

  exports.default = deepFreeze;
});