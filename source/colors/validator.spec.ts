import validator from "./validator";

interface IValidatorTest {
  in: IColorValue;
  out: boolean;
}

const testCases: IValidatorTest[] = [
  // proper colors
  { in: ["rgb", 240, 255, 0], out: true },
  { in: ["hex", "ff", "00", "aa"], out: true },
  { in: ["hsl", 359, 50, 60], out: true },
  { in: ["hwb", 300, 100, 50], out: true },
  // wrong colors
  { in: ["hex", 0, 0, 0], out: false },
  { in: ["hex", "zz", "xx", "yy"], out: false },
  { in: ["hex", "ab", "ab", "a"], out: false },
  { in: ["hex", "12", "34", "567"], out: false },
  { in: ["hex", 0, 0, 0], out: false },
  { in: ["hex", "zz", "xx", "yy"], out: false },
  { in: ["hex", "ab", "ab", "a"], out: false },
  { in: ["hex", "12", "34", "567"], out: false },
  { in: ["rgb", 0, 0, 256], out: false },
  { in: ["rgb", 0, 0, 125.5], out: false },
  { in: ["hsl", 900, 0, 0], out: false },
  { in: ["hsl", 125.5, 0, 0], out: false },
  { in: ["hsl", 360, 110, 0], out: false },
  { in: ["hsl", 360, 0, 110], out: false },
  { in: ["hsl", -45, 0.5, 55.5], out: false },
  { in: ["hwb", 900, 0, 0], out: false },
  { in: ["hwb", 125.5, 0, 0], out: false },
  { in: ["hwb", 360, 110, 0], out: false },
  { in: ["hwb", 360, 0, 110], out: false },
  { in: ["hwb", -45, 0.5, 55.5], out: false },
];

describe("validator.isValid", () => {
  testCases.forEach((testCase) => {
    it(`should properly validate color ${testCase.in}`, () => {
      expect(validator.isValid(testCase.in)).toStrictEqual(testCase.out);
    });
  });
});

describe("validator.isSameColor", () => {
  it("should fail for different colors", () => {
    expect(
      validator.isSameColor(["rgb", 0, 0, 0], ["rgb", 0, 0, 1])
    ).toBeFalsy();
    expect(
      validator.isSameColor(["hsl", 0, 0, 0], ["hwb", 0, 0, 0])
    ).toBeFalsy();
    expect(
      validator.isSameColor(["hsl", 0, 0, 0, 0], ["hsl", 0, 0, 0])
    ).toBeFalsy();
  });
});
