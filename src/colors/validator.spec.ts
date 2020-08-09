import validator from "./validator";

describe("validator.isHex", () => {
  it("should fail for invalid values", () => {
    expect(validator.isHex(["hex", 0, 0, 0])).toBeFalsy();
    expect(validator.isHex(["hex", "zz", "xx", "yy"])).toBeFalsy();
    expect(validator.isHex(["hex", "ab", "ab", "a"])).toBeFalsy();
    expect(validator.isHex(["hex", "12", "34", "567"])).toBeFalsy();
  });
});

describe("validator.isRgb", () => {
  it("should fail for invalid values", () => {
    expect(validator.isRgb(["rgb", 0, 0, 256])).toBeFalsy();
    expect(validator.isRgb(["rgb", 0, 0, 125.5])).toBeFalsy();
  });
});

describe("validator.isHsl", () => {
  it("should fail for invalid values", () => {
    expect(validator.isHsl(["hsl", 900, 0, 0])).toBeFalsy();
    expect(validator.isHsl(["hsl", 125.5, 0, 0])).toBeFalsy();
    expect(validator.isHsl(["hsl", 360, 110, 0])).toBeFalsy();
    expect(validator.isHsl(["hsl", 360, 0, 110])).toBeFalsy();
    expect(validator.isHsl(["hsl", -45, 0.5, 55.5])).toBeFalsy();
  });
});

describe("validator.isHwb", () => {
  it("should fail for invalid values", () => {
    expect(validator.isHwb(["hwb", 900, 0, 0])).toBeFalsy();
    expect(validator.isHwb(["hwb", 125.5, 0, 0])).toBeFalsy();
    expect(validator.isHwb(["hwb", 360, 110, 0])).toBeFalsy();
    expect(validator.isHwb(["hwb", 360, 0, 110])).toBeFalsy();
    expect(validator.isHwb(["hwb", -45, 0.5, 55.5])).toBeFalsy();
  });
});

describe("converter.isSameColor", () => {
  it("should fail for different colors", () => {
    expect(
      validator.isSameColor(["rgb", 0, 0, 0], ["rgb", 0, 0, 1])
    ).toBeFalsy();
    expect(
      validator.isSameColor(["hsl", 0, 0, 0], ["hwb", 0, 0, 0])
    ).toBeFalsy();
  });
});
