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

    var Colorverter = function () {
        function Colorverter() {
            _classCallCheck(this, Colorverter);

            this._hexRegex = new RegExp('[0-9A-F]{2}', 'i');
            this._errors = Object.freeze({
                invalidValue: function invalidValue(colorVal) {
                    return 'Not a proper color value: \'' + colorVal + '\'!';
                }
            });
        }

        // -----------------------------------------------------------------------------
        // helpers
        // -----------------------------------------------------------------------------

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
            key: 'getRandomRgb',
            value: function getRandomRgb() {
                return this._roundValues([Math.random() * 255, Math.random() * 255, Math.random() * 255]);
            }
        }, {
            key: 'getRandomHex',
            value: function getRandomHex() {
                return this.rgbToHex(this.getRandomRgb());
            }
        }, {
            key: 'getRandomHsl',
            value: function getRandomHsl() {
                return this.rgbToHsl(this.getRandomRgb());
            }
        }, {
            key: 'getRandomHwb',
            value: function getRandomHwb() {
                return this.rgbToHwb(this.getRandomRgb());
            }
        }, {
            key: 'isColor',
            value: function isColor(color) {
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
            key: 'isHex',
            value: function isHex(hex) {
                if (!this.isColor(hex)) {
                    return false;
                }
                var isHexR = this._isHexValue(hex[0]);
                var isHexG = this._isHexValue(hex[1]);
                var isHexB = this._isHexValue(hex[2]);
                return isHexR && isHexG && isHexB;
            }
        }, {
            key: 'isRgb',
            value: function isRgb(rgb) {
                if (!this.isColor(rgb)) {
                    return false;
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = rgb[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var value = _step.value;

                        if (!this._isIntInRange(value, 0, 255)) {
                            return false;
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

                return true;
            }
        }, {
            key: 'isHsl',
            value: function isHsl(hsl) {
                if (!this.isColor(hsl)) {
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
            key: 'isHwb',
            value: function isHwb(hwb) {
                if (!this.isColor(hwb)) {
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
                if (!this.isColor(first) || !this.isColor(second)) {
                    return false;
                }
                // different lenght means different array
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
            key: 'hexToRgb',
            value: function hexToRgb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                var red = this._hexToInt(colorVal[0]);
                var green = this._hexToInt(colorVal[1]);
                var blue = this._hexToInt(colorVal[2]);
                return [red, green, blue];
            }
        }, {
            key: 'hexToHsl',
            value: function hexToHsl(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hexToHslFloat(colorVal));
            }
        }, {
            key: 'hexToHwb',
            value: function hexToHwb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hexToHwbFloat(colorVal));
            }
        }, {
            key: '_hexToHslFloat',
            value: function _hexToHslFloat(colorVal) {
                return this._rgbToHslFloat(this.hexToRgb(colorVal));
            }
        }, {
            key: '_hexToHwbFloat',
            value: function _hexToHwbFloat(colorVal) {
                return this._rgbToHwbFloat(this.hexToRgb(colorVal));
            }
        }, {
            key: 'rgbToHex',
            value: function rgbToHex(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                var red16 = this._intToHex(colorVal[0]);
                var green16 = this._intToHex(colorVal[1]);
                var blue16 = this._intToHex(colorVal[2]);
                return [red16, green16, blue16];
            }
        }, {
            key: 'rgbToHsl',
            value: function rgbToHsl(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._rgbToHslFloat(colorVal));
            }
        }, {
            key: 'rgbToHwb',
            value: function rgbToHwb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._rgbToHwbFloat(colorVal));
            }
        }, {
            key: '_rgbToHslFloat',
            value: function _rgbToHslFloat(colorVal) {
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
            key: '_rgbToHwbFloat',
            value: function _rgbToHwbFloat(colorVal) {
                var red = colorVal[0];
                var green = colorVal[1];
                var blue = colorVal[2];

                var hue = this._rgbToHslFloat(colorVal)[0];
                var whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
                var blackness = 1 - 1 / 255 * Math.max(red, Math.max(green, blue));

                return [hue, whiteness * 100, blackness * 100];
            }
        }, {
            key: 'hslToHex',
            value: function hslToHex(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this.rgbToHex(this._hslToRgbFloat(colorVal));
            }
        }, {
            key: 'hslToRgb',
            value: function hslToRgb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hslToRgbFloat(colorVal));
            }
        }, {
            key: 'hslToHwb',
            value: function hslToHwb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hslToHwbFloat(colorVal));
            }
        }, {
            key: '_hslToRgbFloat',
            value: function _hslToRgbFloat(colorVal) {
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
            key: '_hslToHwbFloat',
            value: function _hslToHwbFloat(colorVal) {
                return this._rgbToHwbFloat(this._hslToRgbFloat(colorVal));
            }
        }, {
            key: 'hwbToHex',
            value: function hwbToHex(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this.rgbToHex(this._hwbToRgbFloat(colorVal));
            }
        }, {
            key: 'hwbToRgb',
            value: function hwbToRgb(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hwbToRgbFloat(colorVal));
            }
        }, {
            key: 'hwbToHsl',
            value: function hwbToHsl(colorVal) {
                if (!this.isColor(colorVal)) {
                    throw new TypeError(this._errors.invalidValue(colorVal));
                }

                return this._roundValues(this._hwbToHslFloat(colorVal));
            }
        }, {
            key: '_hwbToRgbFloat',
            value: function _hwbToRgbFloat(colorVal) {
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
            key: '_hwbToHslFloat',
            value: function _hwbToHslFloat(colorVal) {
                return this._rgbToHslFloat(this._hwbToRgbFloat(colorVal));
            }
        }]);

        return Colorverter;
    }();

    exports.default = new Colorverter();
});