import converter from "./converter";
import validator from "./validator";

type TPredefined = {
  [K in TSpace]: IColorValue;
};

const black: TPredefined = {
  hex: ["hex", "00", "00", "00"],
  hsl: ["hsl", 0, 0, 0],
  hwb: ["hwb", 0, 0, 100],
  rgb: ["rgb", 0, 0, 0]
};

const white: TPredefined = {
  hex: ["hex", "ff", "ff", "ff"],
  hsl: ["hsl", 0, 0, 100],
  hwb: ["hwb", 0, 100, 0],
  rgb: ["rgb", 255, 255, 255]
};

const gray: TPredefined = {
  hex: ["hex", "80", "80", "80"],
  hsl: ["hsl", 0, 0, 50],
  hwb: ["hwb", 0, 100, 100],
  rgb: ["rgb", 128, 128, 128]
};

describe("converter.convertTo", () => {
  const testPairs = [
    [["hex", "00", "7f", "ff"], ["rgb", 0, 127, 255]],
    [["hex", "00", "7f", "ff"], ["hsl", 210, 100, 50]],
    [["hex", "00", "7f", "ff"], ["hwb", 210, 0, 0]],
    [["hex", "ab", "cd", "ef"], ["rgb", 171, 205, 239]],
    [["rgb", 0, 127, 255], ["hex", "00", "7f", "ff"]],
    [["rgb", 0, 127, 255], ["hwb", 210, 0, 0]],
    [["hsl", 210, 100, 50], ["hex", "00", "7f", "ff"]],
    [["hsl", 210, 100, 50], ["rgb", 0, 127, 255]],
    [["hsl", 210, 100, 50], ["hwb", 210, 0, 0]],
    [["hsl", 96, 48, 59], ["hwb", 96, 39, 21]],
    [["hwb", 210, 0, 0], ["hex", "00", "80", "ff"]],
    [["hwb", 210, 0, 0], ["rgb", 0, 128, 255]],
    [["hwb", 210, 0, 0], ["hsl", 210, 100, 50]],
    [["hwb", 0, 0, 0], ["rgb", 255, 0, 0]],
    [["hwb", 0, 20, 40], ["rgb", 153, 51, 51]],
    [["hwb", 0, 40, 40], ["rgb", 153, 102, 102]],
    [["hwb", 0, 40, 20], ["rgb", 204, 102, 102]],
    [["hwb", 120, 0, 0], ["rgb", 0, 255, 0]],
    [["hwb", 120, 20, 40], ["rgb", 51, 153, 51]],
    [["hwb", 120, 40, 40], ["rgb", 102, 153, 102]],
    [["hwb", 120, 40, 20], ["rgb", 102, 204, 102]],
    [["hwb", 240, 0, 0], ["rgb", 0, 0, 255]],
    [["hwb", 240, 20, 40], ["rgb", 51, 51, 153]],
    [["hwb", 240, 40, 40], ["rgb", 102, 102, 153]],
    [["hwb", 240, 40, 20], ["rgb", 102, 102, 204]],
    // there are some RGB color variations
    // that can't be displayed with HSL:
    [["rgb", 0, 125, 255], ["hsl", 211, 100, 50]],
    [["rgb", 0, 126, 255], ["hsl", 210, 100, 50]],
    [["rgb", 0, 127, 255], ["hsl", 210, 100, 50]],
    [["rgb", 0, 128, 255], ["hsl", 210, 100, 50]],
    [["rgb", 0, 129, 255], ["hsl", 210, 100, 50]],
    [["rgb", 0, 130, 255], ["hsl", 209, 100, 50]],
    // black should be still black
    [black.hex, black.hsl],
    [black.hex, black.hwb],
    [black.hex, black.rgb],
    [black.hsl, black.hex],
    [black.hsl, black.hwb],
    [black.hsl, black.rgb],
    [black.hwb, black.hex],
    [black.hwb, black.hsl],
    [black.hwb, black.rgb],
    [black.rgb, black.hex],
    [black.rgb, black.hsl],
    [black.rgb, black.hwb]
  ];

  for (const testPair of testPairs) {
    const colorA = testPair[0] as IColorValue;
    const colorB = testPair[1] as IColorValue;

    it(`should convert ${colorA} to ${colorB}`, () => {
      const converted = converter.convertTo(colorA, colorB[0]);
      expect(converted).toStrictEqual(colorB);
    });
  }

  it("should convert to black for extreme blackness", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const newColor = converter.convertTo(
        ["hwb", angle, 0, 100],
        black.rgb[0]
      );
      const isSame = validator.isSameColor(newColor, black.rgb);
      expect(isSame).toBeTruthy();
    }
  });

  it("should convert to white for extreme whiteness", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const newColor = converter.convertTo(
        ["hwb", angle, 100, 0],
        white.rgb[0]
      );
      const isSame = validator.isSameColor(newColor, white.rgb);
      expect(isSame).toBeTruthy();
    }
  });

  it("should convert to gray for extreme both parameters", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const newColor = converter.convertTo(
        ["hwb", angle, 100, 100],
        gray.rgb[0]
      );
      const isSame = validator.isSameColor(newColor, gray.rgb);
      expect(isSame).toBeTruthy();
    }
  });
});

describe("converter.getRandomColor", () => {
  it("should return proper HEX color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hex");
      const isValid = validator.isHex(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper RGB color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("rgb");
      const isValid = validator.isRgb(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper HSL color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hsl");
      const isValid = validator.isHsl(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper HWB color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hwb");
      const isValid = validator.isHwb(newRandom);
      expect(isValid).toBeTruthy();
    }
  });
});
