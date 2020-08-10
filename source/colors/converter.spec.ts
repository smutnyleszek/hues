import converter from "./converter";
import validator from "./validator";

type TConverterTestColor = {
  [K in TSpace]: IColorValue;
};

interface IConverterTest {
  in: IColorValue;
  out: IColorValue;
}

const black: TConverterTestColor = {
  hex: ["hex", "00", "00", "00"],
  hsl: ["hsl", 0, 0, 0],
  hwb: ["hwb", 0, 0, 100],
  rgb: ["rgb", 0, 0, 0],
};

const white: TConverterTestColor = {
  hex: ["hex", "ff", "ff", "ff"],
  hsl: ["hsl", 0, 0, 100],
  hwb: ["hwb", 0, 100, 0],
  rgb: ["rgb", 255, 255, 255],
};

const gray: TConverterTestColor = {
  hex: ["hex", "80", "80", "80"],
  hsl: ["hsl", 0, 0, 50],
  hwb: ["hwb", 0, 100, 100],
  rgb: ["rgb", 128, 128, 128],
};

const testCases: IConverterTest[] = [
  { in: ["hex", "00", "7f", "ff"], out: ["rgb", 0, 127, 255] },
  { in: ["hex", "00", "7f", "ff"], out: ["hsl", 210, 100, 50] },
  { in: ["hex", "00", "7f", "ff"], out: ["hwb", 210, 0, 0] },
  { in: ["hex", "ab", "cd", "ef"], out: ["rgb", 171, 205, 239] },
  { in: ["rgb", 0, 127, 255], out: ["hex", "00", "7f", "ff"] },
  { in: ["rgb", 0, 127, 255], out: ["hwb", 210, 0, 0] },
  { in: ["hsl", 210, 100, 50], out: ["hex", "00", "7f", "ff"] },
  { in: ["hsl", 210, 100, 50], out: ["rgb", 0, 127, 255] },
  { in: ["hsl", 210, 100, 50], out: ["hwb", 210, 0, 0] },
  { in: ["hsl", 96, 48, 59], out: ["hwb", 96, 39, 21] },
  { in: ["hwb", 210, 0, 0], out: ["hex", "00", "80", "ff"] },
  { in: ["hwb", 210, 0, 0], out: ["rgb", 0, 128, 255] },
  { in: ["hwb", 210, 0, 0], out: ["hsl", 210, 100, 50] },
  { in: ["hwb", 0, 0, 0], out: ["rgb", 255, 0, 0] },
  { in: ["hwb", 0, 20, 40], out: ["rgb", 153, 51, 51] },
  { in: ["hwb", 0, 40, 40], out: ["rgb", 153, 102, 102] },
  { in: ["hwb", 0, 40, 20], out: ["rgb", 204, 102, 102] },
  { in: ["hwb", 120, 0, 0], out: ["rgb", 0, 255, 0] },
  { in: ["hwb", 120, 20, 40], out: ["rgb", 51, 153, 51] },
  { in: ["hwb", 120, 40, 40], out: ["rgb", 102, 153, 102] },
  { in: ["hwb", 120, 40, 20], out: ["rgb", 102, 204, 102] },
  { in: ["hwb", 240, 0, 0], out: ["rgb", 0, 0, 255] },
  { in: ["hwb", 240, 20, 40], out: ["rgb", 51, 51, 153] },
  { in: ["hwb", 240, 40, 40], out: ["rgb", 102, 102, 153] },
  { in: ["hwb", 240, 40, 20], out: ["rgb", 102, 102, 204] },
  // there are some RGB color variations
  // that can't be displayed with HSL:
  { in: ["rgb", 0, 125, 255], out: ["hsl", 211, 100, 50] },
  { in: ["rgb", 0, 126, 255], out: ["hsl", 210, 100, 50] },
  { in: ["rgb", 0, 127, 255], out: ["hsl", 210, 100, 50] },
  { in: ["rgb", 0, 128, 255], out: ["hsl", 210, 100, 50] },
  { in: ["rgb", 0, 129, 255], out: ["hsl", 210, 100, 50] },
  { in: ["rgb", 0, 130, 255], out: ["hsl", 209, 100, 50] },
  // black should be still black
  { in: black.hex, out: black.hsl },
  { in: black.hex, out: black.hwb },
  { in: black.hex, out: black.rgb },
  { in: black.hsl, out: black.hex },
  { in: black.hsl, out: black.hwb },
  { in: black.hsl, out: black.rgb },
  { in: black.hwb, out: black.hex },
  { in: black.hwb, out: black.hsl },
  { in: black.hwb, out: black.rgb },
  { in: black.rgb, out: black.hex },
  { in: black.rgb, out: black.hsl },
  { in: black.rgb, out: black.hwb },
];

describe("converter.convertTo", () => {
  testCases.forEach((testCase) => {
    it(`should convert ${testCase.in} to ${testCase.out}`, () => {
      const converted = converter.convertTo(testCase.in, testCase.out[0]);
      expect(converted).toStrictEqual(testCase.out);
    });
  });

  it("should convert to black for extreme blackness", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const converted = converter.convertTo(
        ["hwb", angle, 0, 100],
        black.rgb[0]
      );
      expect(converted).toStrictEqual(black.rgb);
    }
  });

  it("should convert to white for extreme whiteness", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const converted = converter.convertTo(
        ["hwb", angle, 100, 0],
        white.rgb[0]
      );
      expect(converted).toStrictEqual(white.rgb);
    }
  });

  it("should convert to gray for extreme both parameters", () => {
    for (let angle = 0; angle <= 360; angle++) {
      const converted = converter.convertTo(
        ["hwb", angle, 100, 100],
        gray.rgb[0]
      );
      expect(converted).toStrictEqual(gray.rgb);
    }
  });
});

describe("converter.getRandomColor", () => {
  it("should return proper HEX color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hex");
      const isValid = validator.isValid(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper RGB color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("rgb");
      const isValid = validator.isValid(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper HSL color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hsl");
      const isValid = validator.isValid(newRandom);
      expect(isValid).toBeTruthy();
    }
  });

  it("should return proper HWB color", () => {
    for (let i = 0; i < 999; i++) {
      const newRandom = converter.getRandomColor("hwb");
      const isValid = validator.isValid(newRandom);
      expect(isValid).toBeTruthy();
    }
  });
});
