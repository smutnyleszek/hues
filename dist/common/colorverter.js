define(['exports', './deepFreeze'], function (exports, _deepFreeze) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

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

  var Colorverter = function () {
    function Colorverter() {
      _classCallCheck(this, Colorverter);

      this._hexRegex = new RegExp('[0-9A-F]{2}', 'i');
      this._errors = Object.freeze({
        invalidValue: function invalidValue(colorVal) {
          return 'Not a proper color value: \'' + colorVal + '\'!';
        }
      });

      // public methods that do stuff -- we try to have them more useful with
      // passable names: `colorverter.convert[name].to[name]`
      this.convert = (0, _deepFreeze2.default)({
        hex: {
          to: {
            rgb: this._hexToRgb.bind(this),
            hsl: this._hexToHsl.bind(this),
            hwb: this._hexToHwb.bind(this)
          }
        },
        rgb: {
          to: {
            hex: this._rgbToHex.bind(this),
            hsl: this._rgbToHsl.bind(this),
            hwb: this._rgbToHwb.bind(this)
          }
        },
        hsl: {
          to: {
            hex: this._hslToHex.bind(this),
            rgb: this._hslToRgb.bind(this),
            hwb: this._hslToHwb.bind(this)
          }
        },
        hwb: {
          to: {
            hex: this._hwbToHex.bind(this),
            rgb: this._hwbToRgb.bind(this),
            hsl: this._hwbToHsl.bind(this)
          }
        }
      });
      this.validate = (0, _deepFreeze2.default)({
        hex: this._isHex.bind(this),
        rgb: this._isRgb.bind(this),
        hsl: this._isHsl.bind(this),
        hwb: this._isHwb.bind(this)
      });
      this.getRandom = (0, _deepFreeze2.default)({
        hex: this._getRandomHex.bind(this),
        rgb: this._getRandomRgb.bind(this),
        hsl: this._getRandomHsl.bind(this),
        hwb: this._getRandomHwb.bind(this)
      });
      this.intToHex = this._intToHex.bind(this);
      this.hexToInt = this._hexToInt.bind(this);
    }

    // ---------------------------------------------------------------------------
    // helpers
    // ---------------------------------------------------------------------------

    _createClass(Colorverter, [{
      key: '_roundValues',
      value: function _roundValues(color) {
        var safe = [];
        for (var i = 0; i < color.length; i++) {
          var part = color[i];
          if (typeof part === 'number') {
            safe.push(Math.round(part));
          } else {
            safe.push(part);
          }
        }
        return safe;
      }
    }, {
      key: '_intToHex',
      value: function _intToHex(decimal) {
        var hex = Math.round(Number(decimal)).toString(16);
        // make sure to always have two characters
        return ('0' + hex).slice(-2);
      }
    }, {
      key: '_hexToInt',
      value: function _hexToInt(hex) {
        return parseInt(hex, 16);
      }
    }, {
      key: '_getRandomRgb',
      value: function _getRandomRgb() {
        return this._roundValues([Math.random() * 255, Math.random() * 255, Math.random() * 255]);
      }
    }, {
      key: '_getRandomHex',
      value: function _getRandomHex() {
        return this._rgbToHex(this._getRandomRgb());
      }
    }, {
      key: '_getRandomHsl',
      value: function _getRandomHsl() {
        return this._rgbToHsl(this._getRandomRgb());
      }
    }, {
      key: '_getRandomHwb',
      value: function _getRandomHwb() {
        return this._rgbToHwb(this._getRandomRgb());
      }
    }, {
      key: '_isColor',
      value: function _isColor(color) {
        // color needs to be an array
        if (color instanceof Array !== true) {
          return false;
        }
        // color needs to have 3 parameters
        if (color.length !== 3) {
          return false;
        }
        return true;
      }
    }, {
      key: '_isHex',
      value: function _isHex(hex) {
        if (!this._isColor(hex)) {
          return false;
        }

        var isValuesInRange = true;
        var isValuesHex = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = hex[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            if (!this._isHexValue(value)) {
              isValuesHex = false;
            }
            if (!this._isIntInRange(this._hexToInt(value), 0, 255)) {
              isValuesInRange = false;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return isValuesHex && isValuesInRange;
      }
    }, {
      key: '_isRgb',
      value: function _isRgb(rgb) {
        if (!this._isColor(rgb)) {
          return false;
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = rgb[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;

            if (!this._isIntInRange(value, 0, 255)) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return true;
      }
    }, {
      key: '_isHsl',
      value: function _isHsl(hsl) {
        if (!this._isColor(hsl)) {
          return false;
        }
        if (!this._isIntInRange(hsl[0], 0, 360)) {
          return false;
        }
        if (!this._isIntInRange(hsl[1], 0, 100)) {
          return false;
        }
        if (!this._isIntInRange(hsl[2], 0, 100)) {
          return false;
        }
        return true;
      }
    }, {
      key: '_isHwb',
      value: function _isHwb(hwb) {
        if (!this._isColor(hwb)) {
          return false;
        }
        if (!this._isIntInRange(hwb[0], 0, 360)) {
          return false;
        }
        if (!this._isIntInRange(hwb[1], 0, 100)) {
          return false;
        }
        if (!this._isIntInRange(hwb[2], 0, 100)) {
          return false;
        }
        return true;
      }
    }, {
      key: 'isSameColor',
      value: function isSameColor(first, second) {
        if (!this._isColor(first) || !this._isColor(second)) {
          return false;
        }
        // different length means different array
        if (first.length !== second.length) {
          return false;
        }
        var isSame = true;
        for (var i = 0; i < first.length; i++) {
          if (first[i] !== second[i]) {
            isSame = false;
            break;
          }
        }
        return isSame;
      }
    }, {
      key: '_isIntInRange',
      value: function _isIntInRange(number, min, max) {
        if (!Number.isInteger(number)) {
          return false;
        }

        if (number < min) {
          return false;
        } else if (number > max) {
          return false;
        } else {
          return true;
        }
      }
    }, {
      key: '_isHexValue',
      value: function _isHexValue(hexValue) {
        if (typeof hexValue !== 'string') {
          return false;
        }
        return this._hexRegex.test(hexValue);
      }
    }, {
      key: '_hexToRgb',
      value: function _hexToRgb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        var red = this._hexToInt(colorVal[0]);
        var green = this._hexToInt(colorVal[1]);
        var blue = this._hexToInt(colorVal[2]);
        return [red, green, blue];
      }
    }, {
      key: '_hexToHsl',
      value: function _hexToHsl(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hexToHslFloat(colorVal));
      }
    }, {
      key: '_hexToHwb',
      value: function _hexToHwb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hexToHwbFloat(colorVal));
      }
    }, {
      key: '__hexToHslFloat',
      value: function __hexToHslFloat(colorVal) {
        return this.__rgbToHslFloat(this._hexToRgb(colorVal));
      }
    }, {
      key: '__hexToHwbFloat',
      value: function __hexToHwbFloat(colorVal) {
        return this.__rgbToHwbFloat(this._hexToRgb(colorVal));
      }
    }, {
      key: '_rgbToHex',
      value: function _rgbToHex(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        var red16 = this._intToHex(colorVal[0]);
        var green16 = this._intToHex(colorVal[1]);
        var blue16 = this._intToHex(colorVal[2]);
        return [red16, green16, blue16];
      }
    }, {
      key: '_rgbToHsl',
      value: function _rgbToHsl(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__rgbToHslFloat(colorVal));
      }
    }, {
      key: '_rgbToHwb',
      value: function _rgbToHwb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__rgbToHwbFloat(colorVal));
      }
    }, {
      key: '__rgbToHslFloat',
      value: function __rgbToHslFloat(colorVal) {
        var red = colorVal[0] / 255;
        var green = colorVal[1] / 255;
        var blue = colorVal[2] / 255;

        var min = Math.min(red, green, blue);
        var max = Math.max(red, green, blue);
        var delta = max - min;

        // get Hue value
        var hue = null;
        if (max === min) {
          hue = 0;
        } else if (red === max) {
          hue = (green - blue) / delta;
        } else if (green === max) {
          hue = 2 + (blue - red) / delta;
        } else if (blue === max) {
          hue = 4 + (red - green) / delta;
        }
        hue = Math.min(hue * 60, 360);
        if (hue < 0) {
          hue += 360;
        }

        // get Lightness value
        var lightness = (min + max) / 2;

        // get Saturation value
        var saturation = null;
        if (max === min) {
          saturation = 0;
        } else if (lightness <= 0.5) {
          saturation = delta / (max + min);
        } else {
          saturation = delta / (2 - max - min);
        }

        return [hue, saturation * 100, lightness * 100];
      }
    }, {
      key: '__rgbToHwbFloat',
      value: function __rgbToHwbFloat(colorVal) {
        var red = colorVal[0];
        var green = colorVal[1];
        var blue = colorVal[2];

        var hue = this.__rgbToHslFloat(colorVal)[0];
        var whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
        var blackness = 1 - 1 / 255 * Math.max(red, Math.max(green, blue));

        return [hue, whiteness * 100, blackness * 100];
      }
    }, {
      key: '_hslToHex',
      value: function _hslToHex(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._rgbToHex(this.__hslToRgbFloat(colorVal));
      }
    }, {
      key: '_hslToRgb',
      value: function _hslToRgb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hslToRgbFloat(colorVal));
      }
    }, {
      key: '_hslToHwb',
      value: function _hslToHwb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hslToHwbFloat(colorVal));
      }
    }, {
      key: '__hslToRgbFloat',
      value: function __hslToRgbFloat(colorVal) {
        var hue = colorVal[0] / 360;
        var sat = colorVal[1] / 100;
        var lum = colorVal[2] / 100;

        var q = null;
        if (lum <= 0.5) {
          q = lum * (1 + sat);
        } else {
          q = lum + sat - lum * sat;
        }

        var p = 2 * lum - q;

        var rt = hue + 1 / 3;
        var gt = hue;
        var bt = hue - 1 / 3;

        var r = Math.round(this._hueToRgb(p, q, rt) * 255);
        var g = Math.round(this._hueToRgb(p, q, gt) * 255);
        var b = Math.round(this._hueToRgb(p, q, bt) * 255);

        return [r, g, b];
      }
    }, {
      key: '_hueToRgb',
      value: function _hueToRgb(p, q, h) {
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }

        if (h * 6 < 1) {
          return p + (q - p) * h * 6;
        } else if (h * 2 < 1) {
          return q;
        } else if (h * 3 < 2) {
          return p + (q - p) * (2 / 3 - h) * 6;
        } else {
          return p;
        }
      }
    }, {
      key: '__hslToHwbFloat',
      value: function __hslToHwbFloat(colorVal) {
        return this.__rgbToHwbFloat(this.__hslToRgbFloat(colorVal));
      }
    }, {
      key: '_hwbToHex',
      value: function _hwbToHex(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._rgbToHex(this.__hwbToRgbFloat(colorVal));
      }
    }, {
      key: '_hwbToRgb',
      value: function _hwbToRgb(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hwbToRgbFloat(colorVal));
      }
    }, {
      key: '_hwbToHsl',
      value: function _hwbToHsl(colorVal) {
        if (!this._isColor(colorVal)) {
          throw new TypeError(this._errors.invalidValue(colorVal));
        }

        return this._roundValues(this.__hwbToHslFloat(colorVal));
      }
    }, {
      key: '__hwbToRgbFloat',
      value: function __hwbToRgbFloat(colorVal) {
        var hue = colorVal[0] / 360;
        var whiteness = colorVal[1] / 100;
        var blackness = colorVal[2] / 100;
        var ratio = whiteness + blackness;

        // whiteness + blackness cant be > 1
        if (ratio > 1) {
          whiteness /= ratio;
          blackness /= ratio;
        }

        var i = Math.floor(6 * hue);
        var v = 1 - blackness;
        var f = 6 * hue - i;
        if ((i & 0x01) !== 0) {
          f = 1 - f;
        }
        // linear interpolation
        var n = whiteness + f * (v - whiteness);

        var red = 0;
        var green = 0;
        var blue = 0;

        switch (i) {
          case 6:case 0:
            red = v;
            green = n;
            blue = whiteness;
            break;
          case 1:
            red = n;
            green = v;
            blue = whiteness;
            break;
          case 2:
            red = whiteness;
            green = v;
            blue = n;
            break;
          case 3:
            red = whiteness;
            green = n;
            blue = v;
            break;
          case 4:
            red = n;
            green = whiteness;
            blue = v;
            break;
          case 5:
            red = v;
            green = whiteness;
            blue = n;
            break;
          default:
            throw new Error('unproper case ' + i + ' for HWB: ' + colorVal);
        }

        return [red * 255, green * 255, blue * 255];
      }
    }, {
      key: '__hwbToHslFloat',
      value: function __hwbToHslFloat(colorVal) {
        return this.__rgbToHslFloat(this.__hwbToRgbFloat(colorVal));
      }
    }]);

    return Colorverter;
  }();

  exports.default = new Colorverter();
});