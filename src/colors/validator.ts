class Validator {
  private readonly hexRegex = new RegExp("[0-9A-F]{2}", "i");

  public isValid(color: IColorValue) {
    switch (color[0]) {
      case "hex":
        return this.isHex(color);
      case "hsl":
        return this.isHsl(color);
      case "hwb":
        return this.isHwb(color);
      case "rgb":
        return this.isRgb(color);
      default:
        return false;
    }
  }

  public isSameColor(first: IColorValue, second: IColorValue): boolean {
    // different length means different array
    if (first.length !== second.length) {
      return false;
    }
    // different spaces
    if (first[0] !== second[0]) {
      return false;
    }
    let isSame = true;
    for (let i = 0; i < first.length; i++) {
      if (first[i] !== second[i]) {
        isSame = false;
        break;
      }
    }
    return isSame;
  }

  private isHex(hex: IColorValue): boolean {
    let areValuesInRange = true;
    let areValuesHex = true;
    for (let i = 1; i < hex.length; i++) {
      if (this.isHexValue(hex[i]) === false) {
        areValuesHex = false;
      }
      if (
        typeof hex[i] === "string" &&
        !this.isIntInRange(parseInt(hex[i], 16), 0, 255)
      ) {
        areValuesInRange = false;
      }
    }

    return areValuesHex && areValuesInRange;
  }

  private isRgb(rgb: IColorValue): boolean {
    for (let i = 1; i < rgb.length; i++) {
      if (typeof rgb[i] === "number" && !this.isIntInRange(rgb[i], 0, 255)) {
        return false;
      }
    }
    return true;
  }

  private isHsl(hsl: IColorValue): boolean {
    if (typeof hsl[1] === "number" && !this.isIntInRange(hsl[1], 0, 360)) {
      return false;
    }
    if (typeof hsl[2] === "number" && !this.isIntInRange(hsl[2], 0, 100)) {
      return false;
    }
    if (typeof hsl[3] === "number" && !this.isIntInRange(hsl[3], 0, 100)) {
      return false;
    }
    return true;
  }

  private isHwb(hwb: IColorValue): boolean {
    if (typeof hwb[1] === "number" && !this.isIntInRange(hwb[1], 0, 360)) {
      return false;
    }
    if (typeof hwb[2] === "number" && !this.isIntInRange(hwb[2], 0, 100)) {
      return false;
    }
    if (typeof hwb[3] === "number" && !this.isIntInRange(hwb[3], 0, 100)) {
      return false;
    }
    return true;
  }

  private isIntInRange(intValue: number, min: number, max: number) {
    if (!Number.isInteger(intValue)) {
      return false;
    }

    if (intValue < min) {
      return false;
    } else if (intValue > max) {
      return false;
    } else {
      return true;
    }
  }

  private isHexValue(hexValue: string) {
    if (typeof hexValue !== "string") {
      return false;
    }
    return this.hexRegex.test(hexValue);
  }
}

export default new Validator();
