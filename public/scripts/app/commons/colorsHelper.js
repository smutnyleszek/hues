var ColorsHelper;

ColorsHelper = (function() {
  function ColorsHelper() {}

  ColorsHelper.prototype.pacify = function(color) {
    var part, safe, _i, _len;
    safe = [];
    for (_i = 0, _len = color.length; _i < _len; _i++) {
      part = color[_i];
      if (typeof part === 'number') {
        safe.push(Math.round(part));
      } else {
        safe.push(part);
      }
    }
    return safe;
  };

  ColorsHelper.prototype.toHex = function(decimal) {
    var hex;
    hex = Math.round(Number(decimal)).toString(16);
    return ("0" + hex).slice(-2);
  };

  ColorsHelper.prototype.fromHex = function(hex) {
    return parseInt(hex, 16);
  };

  ColorsHelper.prototype.hex2rgb = function(hex) {
    var blue, green, red;
    red = this.fromHex(hex[0]);
    green = this.fromHex(hex[1]);
    blue = this.fromHex(hex[2]);
    return [red, green, blue];
  };

  ColorsHelper.prototype.hex2hsl = function(hex) {
    var blue, green, red, rgb;
    red = this.fromHex(hex[0]);
    green = this.fromHex(hex[1]);
    blue = this.fromHex(hex[2]);
    rgb = [red, green, blue];
    return this.rgb2hsl(rgb);
  };

  ColorsHelper.prototype.hex2hwb = function(hex) {
    var blue, green, red, rgb;
    red = this.fromHex(hex[0]);
    green = this.fromHex(hex[1]);
    blue = this.fromHex(hex[2]);
    rgb = [red, green, blue];
    return this.rgb2hwb(rgb);
  };

  ColorsHelper.prototype.rgb2hex = function(rgb) {
    var blue16, green16, hex, red16;
    red16 = this.toHex(rgb[0]);
    green16 = this.toHex(rgb[1]);
    blue16 = this.toHex(rgb[2]);
    hex = [red16, green16, blue16];
    return hex;
  };

  ColorsHelper.prototype.rgb2hsl = function(rgb) {
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

  ColorsHelper.prototype.rgb2hwb = function(rgb) {
    var blackness, blue, green, hue, red, whiteness;
    red = rgb[0];
    green = rgb[1];
    blue = rgb[2];
    hue = this.rgb2hsl(rgb)[0];
    whiteness = 1 / 255 * Math.min(red, Math.min(green, blue));
    blackness = 1 - (1 / 255 * Math.max(red, Math.max(green, blue)));
    return [hue, whiteness * 100, blackness * 100];
  };

  ColorsHelper.prototype.hsl2hex = function(hsl) {
    return this.rgb2hex(this.hsl2rgb(hsl));
  };

  ColorsHelper.prototype.hsl2rgb = function(hsl) {
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

  ColorsHelper.prototype.hsl2hwb = function(args) {
    return this.rgb2hwb(this.hsl2rgb(args));
  };

  ColorsHelper.prototype.hwb2hex = function(hwb) {
    return this.rgb2hex(this.hwb2rgb(hwb));
  };

  ColorsHelper.prototype.hwb2rgb = function(hwb) {
    var blackness, blue, f, green, hue, i, n, ratio, red, rgb, v, whiteness;
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
    red = 0;
    green = 0;
    blue = 0;
    switch (i) {
      case 6:
      case 0:
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
        console.warn("unproper case " + i + " for HWB: " + hwb);
    }
    rgb = [red * 255, green * 255, blue * 255];
    return rgb;
  };

  ColorsHelper.prototype.hwb2hsl = function(args) {
    return this.rgb2hsl(this.hwb2rgb(args));
  };

  return ColorsHelper;

})();

app.colorsHelper = new ColorsHelper();
