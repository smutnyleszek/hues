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

  var Clipboardier = function () {
    function Clipboardier() {
      _classCallCheck(this, Clipboardier);
    }

    _createClass(Clipboardier, [{
      key: 'copy',
      value: function copy(text) {
        var textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        try {
          document.execCommand('copy');
          console.info('copied text to clipboard:', text);
        } catch (e) {
          console.error(e);
        }
        textField.remove();
      }
    }]);

    return Clipboardier;
  }();

  exports.default = new Clipboardier();
});