class Converter {
  private readonly convertMap = new Map([
    [
      "hex",
      new Map([
        ["hsl", this.hexToHsl.bind(this)],
        ["hwb", this.hexToHwb.bind(this)],
        ["rgb", this.hexToRgb.bind(this)]
      ])
    ],
    [
      "hsl",
      new Map([
        ["hex", this.hslToHex.bind(this)],
        ["hwb", this.hslToHwb.bind(this)],
        ["rgb", this.hslToRgb.bind(this)]
      ])
    ],
    [
      "hwb",
      new Map([
        ["hex", this.hwbToHex.bind(this)],
        ["hsl", this.hwbToHsl.bind(this)],
        ["rgb", this.hwbToRgb.bind(this)]
      ])
    ],
    [
      "rgb",
      new Map([
        ["hex", this.rgbToHex.bind(this)],
        ["hsl", this.rgbToHsl.bind(this)],
        ["hwb", this.rgbToHwb.bind(this)]
      ])
    ]
  ]);

  public getRandomColor(space: TSpace = "rgb"): IColorValue {
    switch (space) {
      case "hex":
        return this.getRandomHex();
      case "hsl":
        return this.getRandomHsl();
      case "hwb":
        return this.getRandomHwb();
      case "rgb":
      default:
        return this.getRandomRgb();
    }
  }

  public convertTo(color: IColorValue, toSpace: TSpace): IColorValue {
    if (color[0] === toSpace) {
      return color;
    } else {
      const fromGroup = this.convertMap.get(color[0]);
      if (fromGroup instanceof Map) {
        const toFn = fromGroup.get(toSpace);
        if (typeof toFn === "function") {
          return toFn(color);
        }
      }
    }
    // safety fallback
    return color;
  }

  public intToHex(decimal: number | string): string {
    const hex = Math.round(Number(decimal)).toString(16);
    // make sure to always have two characters
    return `0${hex}`.slice(-2);
  }

  public hexToInt(hex: string | number): number {
    return parseInt(String(hex), 16);
  }

  // ---------------------------------------------------------------------------
  // helpers
  // ---------------------------------------------------------------------------

  private roundValues(color: IColorValue): IColorValue {
    const safe: IColorValue = JSON.parse(JSON.stringify(color));
    for (let i = 1; i < color.length; i++) {
      if (typeof color[i] === "number") {
        safe[i] = Math.round(color[i]);
      } else {
        safe[i] = color[i];
      }
    }
    return safe;
  }

  // ---------------------------------------------------------------------------
  // generators
  // ---------------------------------------------------------------------------

  private getRandomHex(): IColorValue {
    return this.rgbToHex(this.getRandomRgb());
  }

  private getRandomHsl(): IColorValue {
    return this.rgbToHsl(this.getRandomRgb());
  }

  private getRandomHwb(): IColorValue {
    return this.rgbToHwb(this.getRandomRgb());
  }

  private getRandomRgb(): IColorValue {
    return this.roundValues([
      "rgb",
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    ]);
  }

  // ---------------------------------------------------------------------------
  // conversion from hex
  // ---------------------------------------------------------------------------

  private hexToRgb(color: IColorValue): IColorValue {
    const red = this.hexToInt(color[1]);
    const green = this.hexToInt(color[2]);
    const blue = this.hexToInt(color[3]);
    return ["rgb", red, green, blue];
  }

  private hexToHsl(color: IColorValue): IColorValue {
    return this.roundValues(this.hexToHslFloat(color));
  }

  private hexToHwb(color: IColorValue): IColorValue {
    return this.roundValues(this.hexToHwbFloat(color));
  }

  private hexToHslFloat(color: IColorValue): IColorValue {
    return this.rgbToHslFloat(this.hexToRgb(color));
  }

  private hexToHwbFloat(color: IColorValue): IColorValue {
    return this.rgbToHwbFloat(this.hexToRgb(color));
  }

  // ---------------------------------------------------------------------------
  // conversion from rgb
  // ---------------------------------------------------------------------------

  private rgbToHex(color: IColorValue): IColorValue {
    const red16 = this.intToHex(color[1]);
    const green16 = this.intToHex(color[2]);
    const blue16 = this.intToHex(color[3]);
    return ["hex", red16, green16, blue16];
  }

  private rgbToHsl(color: IColorValue): IColorValue {
    return this.roundValues(this.rgbToHslFloat(color));
  }

  private rgbToHwb(color: IColorValue): IColorValue {
    return this.roundValues(this.rgbToHwbFloat(color));
  }

  private rgbToHslFloat(color: IColorValue): IColorValue {
    const red = Number(color[1]) / 255;
    const green = Number(color[2]) / 255;
    const blue = Number(color[3]) / 255;

    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    const delta = max - min;

    // get Hue value
    let hue = 0;
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

    return ["hsl", hue, saturation * 100, lightness * 100];
  }

  private rgbToHwbFloat(color: IColorValue): IColorValue {
    const red = Number(color[1]);
    const green = Number(color[2]);
    const blue = Number(color[3]);

    const hue = this.rgbToHslFloat(color)[0];
    const whiteness = (1 / 255) * Math.min(red, Math.min(green, blue));
    const blackness = 1 - (1 / 255) * Math.max(red, Math.max(green, blue));

    return ["hwb", hue, whiteness * 100, blackness * 100];
  }

  // ---------------------------------------------------------------------------
  // conversion from hsl
  // ---------------------------------------------------------------------------

  private hslToHex(color: IColorValue): IColorValue {
    return this.rgbToHex(this.hslToRgbFloat(color));
  }

  private hslToRgb(color: IColorValue): IColorValue {
    return this.roundValues(this.hslToRgbFloat(color));
  }

  private hslToHwb(color: IColorValue): IColorValue {
    return this.roundValues(this.hslToHwbFloat(color));
  }

  private hslToRgbFloat(color: IColorValue): IColorValue {
    const hue = Number(color[1]) / 360;
    const sat = Number(color[2]) / 100;
    const lum = Number(color[3]) / 100;

    let q = null;
    if (lum <= 0.5) {
      q = lum * (1 + sat);
    } else {
      q = lum + sat - lum * sat;
    }

    const p = 2 * lum - q;

    const rt = hue + 1 / 3;
    const gt = hue;
    const bt = hue - 1 / 3;

    const r = Math.round(this.hueToRgb(p, q, rt) * 255);
    const g = Math.round(this.hueToRgb(p, q, gt) * 255);
    const b = Math.round(this.hueToRgb(p, q, bt) * 255);

    return ["rgb", r, g, b];
  }

  private hueToRgb(p: number, q: number, h: number): number {
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

  private hslToHwbFloat(color: IColorValue): IColorValue {
    return this.rgbToHwbFloat(this.hslToRgbFloat(color));
  }

  // ---------------------------------------------------------------------------
  // conversion from hwb
  // ---------------------------------------------------------------------------

  private hwbToHex(color: IColorValue): IColorValue {
    return this.rgbToHex(this.hwbToRgbFloat(color));
  }

  private hwbToRgb(color: IColorValue): IColorValue {
    return this.roundValues(this.hwbToRgbFloat(color));
  }

  private hwbToHsl(color: IColorValue): IColorValue {
    return this.roundValues(this.hwbToHslFloat(color));
  }

  // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
  private hwbToRgbFloat(color: IColorValue): IColorValue {
    const hue = Number(color[1]) / 360;
    let whiteness = Number(color[2]) / 100;
    let blackness = Number(color[3]) / 100;
    const ratio = whiteness + blackness;

    // whiteness + blackness cant be > 1
    if (ratio > 1) {
      whiteness /= ratio;
      blackness /= ratio;
    }

    const i = Math.floor(6 * hue);
    const v = 1 - blackness;
    let f = 6 * hue - i;
    // tslint:disable-next-line:no-bitwise
    if ((i & 0x01) !== 0) {
      f = 1 - f;
    }
    // linear interpolation
    const n = whiteness + f * (v - whiteness);

    let red = 0;
    let green = 0;
    let blue = 0;

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
        throw new Error(`unproper case ${i} for HWB: ${color}`);
    }

    return ["rgb", red * 255, green * 255, blue * 255];
  }

  private hwbToHslFloat(color: IColorValue) {
    return this.rgbToHslFloat(this.hwbToRgbFloat(color));
  }
}

export default new Converter();
