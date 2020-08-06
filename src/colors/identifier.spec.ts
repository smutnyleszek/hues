import identifier from "./identifier";

const pairs = [
  // proper ones
  { in: "rgb(240,255,0)", out: ["rgb", 240, 255, 0] },
  { in: "#ff00aa", out: ["hex", "ff", "00", "aa"] },
  { in: "hsl(359,50%,60%)", out: ["hsl", 359, 50, 60] },
  { in: "hwb(300,100%,50%)", out: ["hwb", 300, 100, 50] },
  // semicolon case
  { in: "rgb(1,2,3);", out: ["rgb", 1, 2, 3] },
  // white space
  { in: "rgb (1,2,3)", out: null },
  { in: "rgb(1, 2,3)", out: ["rgb", 1, 2, 3] },
  { in: " rgb( 1 , 2 , 3 ) ", out: ["rgb", 1, 2, 3] },
  { in: "    rgb(  1  ,  2 , 3    ); ", out: ["rgb", 1, 2, 3] },
  { in: "hsl( 1,2%,3% )", out: ["hsl", 359, 50, 60] },
  { in: "hwb(1, 2%, 3%)", out: ["hwb", 1, 2, 3] },
  // wrong rgb
  { in: "rgb(a,2,3)", out: null },
  { in: "rgb(-2,4,3)", out: null },
  { in: "rgb(256,4,3)", out: null },
  { in: "rgb(1,2,2600)", out: null },
  { in: "rgb(1,2)", out: null },
  { in: "rgb(1,,3)", out: null },
  // wrong hex
  { in: "#ff", out: null },
  { in: "#ffff", out: null },
  { in: "#fffff", out: null },
  { in: "#fffffff", out: null },
  // wrogn hsl
  { in: "hsl(240,100,100)", out: null },
  { in: "hsl(400,50%,50%)", out: null },
  { in: "hsl(125,50%,120%)", out: null },
  { in: "hsl(125,,120%)", out: null },
  { in: "hsl(a,b,c)", out: null },
  // wrogn hwb
  { in: "hwb(240,100,100)", out: null },
  { in: "hwb(400,50%,50%)", out: null },
  { in: "hwb(125,50%,120%)", out: null },
  { in: "hwb(125,,120%)", out: null },
  { in: "hwb(a,b,c)", out: null }
];

describe("identifier", () => {
  pairs.forEach(pair => {
    it(`should properly identify color ${pair.in}`, () => {
      expect(identifier.identify(pair.in)).toBe(pair.out);
    });
  });
});
