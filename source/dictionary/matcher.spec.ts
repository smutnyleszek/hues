import matcher from "./matcher";

interface IMatcherTest {
  in: IColorValue;
  out: IColorMatch;
}

const testCases: IMatcherTest[] = [
  // proper ones
  {
    in: ["rgb", 0, 0, 0],
    out: { difference: 0, color: ["hsl", 0, 0, 0], name: "Black" },
  },
];

describe("matcher.formatColor", () => {
  testCases.forEach((testCase) => {
    it(`should match color ${testCase.in} to ${testCase.out}`, () => {
      expect(matcher.matchColor(testCase.in)).toStrictEqual(testCase.out);
    });
  });
});
