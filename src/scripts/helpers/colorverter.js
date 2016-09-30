class Colorverter {
    constructor() {
        this._hexRegex = new RegExp('[0-9A-F]{2}', 'i');
    }

// -----------------------------------------------------------------------------
// helpers
// -----------------------------------------------------------------------------

    _roundValues(color) {
        const safe = [];
        for (let i = 0; i < color.length; i++) {
            const part = color[i];
            if (typeof part === 'number') {
                safe.push(Math.round(part));
            } else {
                safe.push(part);
            }
        }
        return safe;
    }

    _intToHex(decimal) {
        const hex = Math.round(Number(decimal)).toString(16);
        // make sure to always have two characters
        return `0${hex}`.slice(-2);
    }

    _hexToInt(hex) {
        return parseInt(hex, 16);
    }

    isHex(string) {
        return this._hexRegex.test(string);
    }

// -----------------------------------------------------------------------------
// conversion from hex
// -----------------------------------------------------------------------------

    hexToRgb(hex) {
        const red = this._hexToInt(hex[0]);
        const green = this._hexToInt(hex[1]);
        const blue = this._hexToInt(hex[2]);
        return [red, green, blue];
    }

    hexToHsl(hex) {
        return this._roundValues(this._hexToHslFloat(hex));
    }

    _hexToHslFloat(hex) {
        return this._rgbToHslFloat(this.hexToRgb(hex));
    }

    hexToHwb(hex) {
        return this._roundValues(this._hexToHwbFloat(hex));
    }

    _hexToHwbFloat(hex) {
        return this._rgbToHwbFloat(this.hexToRgb(hex));
    }

// -----------------------------------------------------------------------------
// conversion from rgb
// -----------------------------------------------------------------------------

    rgbToHex(rgb) {
        const red16 = this._intToHex(rgb[0]);
        const green16 = this._intToHex(rgb[1]);
        const blue16 = this._intToHex(rgb[2]);
        return [red16, green16, blue16];
    }

    rgbToHsl(rgb) {
        return this._roundValues(this._rgbToHslFloat(rgb));
    }

    _rgbToHslFloat(rgb) {
        const red = rgb[0] / 255;
        const green = rgb[1] / 255;
        const blue = rgb[2] / 255;

        const min = Math.min(red, green, blue);
        const max = Math.max(red, green, blue);
        const delta = max - min;

        // get Hue value
        let hue = null;
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
        const lightness = (min + max) / 2;

        // get Saturation value
        let saturation = null;
        if (max === min) {
            saturation = 0;
        } else if (lightness <= 0.5) {
            saturation = delta / (max + min);
        } else {
            saturation = delta / (2 - max - min);
        }

        return [hue, saturation * 100, lightness * 100];
    }

    rgbToHwb(rgb) {
        return this._roundValues(this._rgbToHwbFloat(rgb));
    }

    _rgbToHwbFloat(rgb) {
        const red = rgb[0];
        const green = rgb[1];
        const blue = rgb[2];

        const hue = this._rgbToHslFloat(rgb)[0];
        const whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
        const blackness = 1 - 1 / 255 * Math.max(red, Math.max(green, blue));

        return [hue, whiteness * 100, blackness * 100];
    }

// -----------------------------------------------------------------------------
// conversion from hsl
// -----------------------------------------------------------------------------

    hslToHex(hsl) {
        return this.rgbToHex(this._hslToRgbFloat(hsl));
    }

    hslToRgb(hsl) {
        return this._roundValues(this._hslToRgbFloat(hsl));
    }

    _hslToRgbFloat(hsl) {
        const hue = hsl[0] / 360;
        const saturation = hsl[1] / 100;
        const lightness = hsl[2] / 100;

        if (saturation === 0) {
            return [lightness * 255, lightness * 255, lightness * 255];
        }

        let t2 = null;
        if (lightness < 0.5) {
            t2 = lightness * (1 + saturation);
        } else {
            t2 = lightness + saturation - lightness * saturation;
        }

        const t1 = 2 * lightness - t2;

        const rgb = [0, 0, 0];
        let i = 0;
        while (i < 3) {
            let t3 = hue + 1 / 3 * -(i - 1);
            if (t3 < 0) {
                t3++;
            } else if (t3 > 1) {
                t3--;
            }
            let rgbValue = null;
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

    hslToHwb(hsl) {
        return this._roundValues(this._hslToHwbFloat(hsl));
    }

    _hslToHwbFloat(hsl) {
        return this._rgbToHwbFloat(this._hslToRgbFloat(hsl));
    }

// -----------------------------------------------------------------------------
// conversion from hwb
// -----------------------------------------------------------------------------

    hwbToHex(hwb) {
        return this.rgbToHex(this._hwbToRgbFloat(hwb));
    }

    hwbToRgb(hwb) {
        return this._roundValues(this._hwbToRgbFloat(hwb));
    }

    // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    _hwbToRgbFloat(hwb) {
        const hue = hwb[0] / 360;
        let whiteness = hwb[1] / 100;
        let blackness = hwb[2] / 100;
        const ratio = whiteness + blackness;

        // whiteness + blackness cant be > 1
        if (ratio > 1) {
            whiteness /= ratio;
            blackness /= ratio;
        }

        const i = Math.floor(6 * hue);
        const v = 1 - blackness;
        let f = 6 * hue - i;
        if ((i & 0x01) !== 0) {
            f = 1 - f;
        }
        // linear interpolation
        const n = whiteness + f * (v - whiteness);

        let red = 0;
        let green = 0;
        let blue = 0;

        switch (i) {
            case 6: case 0:
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
                throw new Error(`unproper case ${i} for HWB: ${hwb}`);
        }

        return [red * 255, green * 255, blue * 255];
    }

    hwbToHsl(hwb) {
        return this._roundValues(this._hwbToHslFloat(hwb));
    }

    _hwbToHslFloat(hwb) {
        return this._rgbToHslFloat(this._hwbToRgbFloat(hwb));
    }
}

export default new Colorverter();
