import slugifier from "./slugifier";

const testCases = [
  // proper colors
  { in: "Deep Purple", out: "deep-purple" },
  {
    in: "pójdźże, kiń tę chmurność w głąb flaszy",
    out: "pojdzze-kin-te-chmurnosc-w-glab-flaszy",
  },
];

describe("slugifier.slugify", () => {
  testCases.forEach((testCase) => {
    it(`should properly slugify string "${testCase.in}"`, () => {
      expect(slugifier.slugify(testCase.in)).toStrictEqual(testCase.out);
    });
  });
});
