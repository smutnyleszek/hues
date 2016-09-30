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
            key: 'isHex',
            value: function isHex(string) {
                return this._hexRegex.test(string);
            }
        }, {
            key: 'hexToRgb',
            value: function hexToRgb(hex) {
                var red = this._hexToInt(hex[0]);
                var green = this._hexToInt(hex[1]);
                var blue = this._hexToInt(hex[2]);
                return [red, green, blue];
            }
        }, {
            key: 'hexToHsl',
            value: function hexToHsl(hex) {
                return this._roundValues(this._hexToHslFloat(hex));
            }
        }, {
            key: '_hexToHslFloat',
            value: function _hexToHslFloat(hex) {
                return this._rgbToHslFloat(this.hexToRgb(hex));
            }
        }, {
            key: 'hexToHwb',
            value: function hexToHwb(hex) {
                return this._roundValues(this._hexToHwbFloat(hex));
            }
        }, {
            key: '_hexToHwbFloat',
            value: function _hexToHwbFloat(hex) {
                return this._rgbToHwbFloat(this.hexToRgb(hex));
            }
        }, {
            key: 'rgbToHex',
            value: function rgbToHex(rgb) {
                var red16 = this._intToHex(rgb[0]);
                var green16 = this._intToHex(rgb[1]);
                var blue16 = this._intToHex(rgb[2]);
                return [red16, green16, blue16];
            }
        }, {
            key: 'rgbToHsl',
            value: function rgbToHsl(rgb) {
                return this._roundValues(this._rgbToHslFloat(rgb));
            }
        }, {
            key: '_rgbToHslFloat',
            value: function _rgbToHslFloat(rgb) {
                var red = rgb[0] / 255;
                var green = rgb[1] / 255;
                var blue = rgb[2] / 255;

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
            key: 'rgbToHwb',
            value: function rgbToHwb(rgb) {
                return this._roundValues(this._rgbToHwbFloat(rgb));
            }
        }, {
            key: '_rgbToHwbFloat',
            value: function _rgbToHwbFloat(rgb) {
                var red = rgb[0];
                var green = rgb[1];
                var blue = rgb[2];

                var hue = this._rgbToHslFloat(rgb)[0];
                var whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
                var blackness = 1 - 1 / 255 * Math.max(red, Math.max(green, blue));

                return [hue, whiteness * 100, blackness * 100];
            }
        }, {
            key: 'hslToHex',
            value: function hslToHex(hsl) {
                return this.rgbToHex(this._hslToRgbFloat(hsl));
            }
        }, {
            key: 'hslToRgb',
            value: function hslToRgb(hsl) {
                return this._roundValues(this._hslToRgbFloat(hsl));
            }
        }, {
            key: '_hslToRgbFloat',
            value: function _hslToRgbFloat(hsl) {
                var hue = hsl[0] / 360;
                var saturation = hsl[1] / 100;
                var lightness = hsl[2] / 100;

                if (saturation === 0) {
                    return [lightness * 255, lightness * 255, lightness * 255];
                }

                var t2 = null;
                if (lightness < 0.5) {
                    t2 = lightness * (1 + saturation);
                } else {
                    t2 = lightness + saturation - lightness * saturation;
                }

                var t1 = 2 * lightness - t2;

                var rgb = [0, 0, 0];
                var i = 0;
                while (i < 3) {
                    var t3 = hue + 1 / 3 * -(i - 1);
                    if (t3 < 0) {
                        t3++;
                    } else if (t3 > 1) {
                        t3--;
                    }
                    var rgbValue = null;
                    if (6 * t3 < 1) {
                        rgbValue = t1 + (t2 - t1) * 6 * t3;
                    } else if (2 * t3 < 1) {
                        rgbValue = t2;
                    } else if (3 * t3 < 2) {
                        rgbValue = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                    } else {
                        rgbValue = t1;
                    }
                    rgb[i] = rgbValue * 255;
                    i++;
                }

                return rgb;
            }
        }, {
            key: 'hslToHwb',
            value: function hslToHwb(hsl) {
                return this._roundValues(this._hslToHwbFloat(hsl));
            }
        }, {
            key: '_hslToHwbFloat',
            value: function _hslToHwbFloat(hsl) {
                return this._rgbToHwbFloat(this._hslToRgbFloat(hsl));
            }
        }, {
            key: 'hwbToHex',
            value: function hwbToHex(hwb) {
                return this.rgbToHex(this._hwbToRgbFloat(hwb));
            }
        }, {
            key: 'hwbToRgb',
            value: function hwbToRgb(hwb) {
                return this._roundValues(this._hwbToRgbFloat(hwb));
            }
        }, {
            key: '_hwbToRgbFloat',
            value: function _hwbToRgbFloat(hwb) {
                var hue = hwb[0] / 360;
                var whiteness = hwb[1] / 100;
                var blackness = hwb[2] / 100;
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
                        throw new Error('unproper case ' + i + ' for HWB: ' + hwb);
                }

                return [red * 255, green * 255, blue * 255];
            }
        }, {
            key: 'hwbToHsl',
            value: function hwbToHsl(hwb) {
                return this._roundValues(this._hwbToHslFloat(hwb));
            }
        }, {
            key: '_hwbToHslFloat',
            value: function _hwbToHslFloat(hwb) {
                return this._rgbToHslFloat(this._hwbToRgbFloat(hwb));
            }
        }]);

        return Colorverter;
    }();

    exports.default = new Colorverter();
});