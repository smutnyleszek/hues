import formatter from "./formatter";

interface IFormatterTest {
  in: IColorValue;
  out: string;
}

const testCases: IFormatterTest[] = [
  // proper ones
  { in: ["rgb", 240, 255, 0], out: "rgb(240, 255, 0)" },
  { in: ["hex", "ff", "00", "aa"], out: "#ff00aa" },
  { in: ["hsl", 359, 50, 60], out: "hsl(359, 50%, 60%)" },
  { in: ["hwb", 300, 100, 50], out: "hwb(300, 100%, 50%)" },
  // wrong ones
  { in: ["hwb", 500, 600, 1000], out: "" }
];

describe("formatter.formatColor", () => {
  testCases.forEach(testCase => {
    it(`should format (in)valid color ${testCase.in}`, () => {
      expect(formatter.formatColor(testCase.in)).toStrictEqual(testCase.out);
    });
  });
});
