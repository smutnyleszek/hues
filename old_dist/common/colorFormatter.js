define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var ColorFormatter = function () {
    function ColorFormatter() {
      _classCallCheck(this, ColorFormatter);
    }

    _createClass(ColorFormatter, [{
      key: 'get',
      value: function get(spaceData) {
        var stringValue = '';
        spaceData.properties.forEach(function (propertyData) {
          if (propertyData.before) {
            stringValue += propertyData.before;
          }
          stringValue += propertyData.value;
          if (propertyData.after) {
            stringValue += propertyData.after;
          }
        });
        return stringValue;
      }
    }]);

    return ColorFormatter;
  }();

  exports.default = new ColorFormatter();
});