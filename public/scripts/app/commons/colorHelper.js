var ColorConvert;

ColorConvert = (function() {
  function ColorConvert() {
    console.info('colorConvert up and running');
  }

  ColorConvert.prototype.pacify = function(color) {
    var part, safe, _i, _len;
    safe = [];
    for (_i = 0, _len = color.length; _i < _len; _i++) {
      part = color[_i];
      safe.push(Math.round(part));
    }
    return safe;
  };

  ColorConvert.prototype._toHex = function(decimal) {
    var hex;
    hex = Number(decimal).toString(16);
    return ("0" + hex).slice(-2);
  };

  ColorConvert.prototype._fromHex = function(hex) {
    return parseInt(hex, 16);
  };

  ColorConvert.prototype.hex2rgb = function(hex) {
    var blue, green, red;
    red = this._fromHex(hex[0]);
    green = this._fromHex(hex[1]);
    blue = this._fromHex(hex[2]);
    return [red, green, blue];
  };

  ColorConvert.prototype.hex2hsl = function(hex) {
    var blue, green, red, rgb;
    red = this._fromHex(hex[0]);
    green = this._fromHex(hex[1]);
    blue = this._fromHex(hex[2]);
    rgb = [red, green, blue];
    return this.rgb2hsl(rgb);
  };

  ColorConvert.prototype.hex2hwb = function(hex) {
    var blue, green, red, rgb;
    red = this._fromHex(hex[0]);
    green = this._fromHex(hex[1]);
    blue = this._fromHex(hex[2]);
    rgb = [red, green, blue];
    return this.rgb2hwb(rgb);
  };

  ColorConvert.prototype.rgb2hex = function(rgb) {
    var blue16, green16, hex, red16;
    red16 = this._toHex(rgb[0]);
    green16 = this._toHex(rgb[1]);
    blue16 = this._toHex(rgb[2]);
    hex = [red16, green16, blue16];
    return hex;
  };

  ColorConvert.prototype.rgb2hsl = function(rgb) {
    var blue, delta, green, hue, lightness, max, min, red, saturation;
    red = rgb[0] / 255;
    green = rgb[1] / 255;
    blue = rgb[2] / 255;
    min = Math.min(red, green, blue);
    max = Math.max(red, green, blue);
    delta = max - min;
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
    lightness = (min + max) / 2;
    if (max === min) {
      saturation = 0;
    } else if (lightness <= 0.5) {
      saturation = delta / (max + min);
    } else {
      saturation = delta / (2 - max - min);
    }
    return [hue, saturation * 100, lightness * 100];
  };

  ColorConvert.prototype.rgb2hwb = function(rgb) {
    var blackness, blue, green, hue, red, whiteness;
    red = rgb[0];
    green = rgb[1];
    blue = rgb[2];
    hue = this.rgb2hsl(rgb)[0];
    whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
    blackness = 1 - (1 / 255 * Math.max(red, Math.max(green, blue)));
    return [hue, whiteness * 100, blackness * 100];
  };

  ColorConvert.prototype.hsl2hex = function(hsl) {
    return this.rgb2hex(this.hsl2rgb(hsl));
  };

  ColorConvert.prototype.hsl2rgb = function(hsl) {
    var hue, i, lightness, rgb, saturation, t1, t2, t3, val;
    hue = hsl[0] / 360;
    saturation = hsl[1] / 100;
    lightness = hsl[2] / 100;
    if (saturation === 0) {
      val = lightness * 255;
      return [val, val, val];
    }
    if (lightness < 0.5) {
      t2 = lightness * (1 + saturation);
    } else {
      t2 = lightness + saturation - (lightness * saturation);
    }
    t1 = 2 * lightness - t2;
    rgb = [0, 0, 0];
    i = 0;
    while (i < 3) {
      t3 = hue + 1 / 3 * -(i - 1);
      t3 < 0 && t3++;
      t3 > 1 && t3--;
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
      i += 1;
    }
    return rgb;
  };

  ColorConvert.prototype.hsl2hwb = function(args) {
    return this.rgb2hwb(this.hsl2rgb(args));
  };

  ColorConvert.prototype.hwb2hex = function(hwb) {
    return this.rgb2hex(this.hwb2rgb(hwb));
  };

  ColorConvert.prototype.hwb2rgb = function(hwb) {
    var blackness, f, hue, i, n, ratio, v, whiteness;
    hue = hwb[0] / 360;
    whiteness = hwb[1] / 100;
    blackness = hwb[2] / 100;
    ratio = whiteness + blackness;
    if (ratio > 1) {
      whiteness /= ratio;
      blackness /= ratio;
    }
    i = Math.floor(6 * hue);
    v = 1 - blackness;
    f = 6 * hue - i;
    if ((i & 0x01) !== 0) {
      f = 1 - f;
    }
    n = whiteness + f * (v - whiteness);
    switch (i) {
      case 6:
      case 0:
        return [v, n, whiteness];
      case 1:
        return [n, v, whiteness];
      case 2:
        return [whiteness, v, n];
      case 3:
        return [whiteness, n, v];
      case 4:
        return [n, whiteness, v];
      case 5:
        return [v, whiteness, n];
      default:
        console.warn("Should return proper value for " + hwb);
        return [0, 0, 0];
    }
  };

  ColorConvert.prototype.hwb2hsl = function(args) {
    return this.rgb2hsl(this.hwb2rgb(args));
  };

  return ColorConvert;

})();

app.colorConvert = new ColorConvert();
