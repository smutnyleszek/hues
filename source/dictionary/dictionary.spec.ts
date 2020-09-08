import * as dictionaryJsonData from "./dictionary.json";
const dictionary: IDictionary = dictionaryJsonData as any;

describe("dictionary", () => {
  it("shouldn't contain duplicated color values", () => {
    const valuesArray: string[] = [];
    dictionary.colors.forEach((color) => {
      valuesArray.push(`${color[0]},${color[1]},${color[2]}`);
    });
    const valuesSet = new Set(valuesArray);
    const valuesSetArray = Array.from(valuesSet);
    expect(valuesArray).toEqual(valuesSetArray);
  });

  it("shouldn't contain duplicated color names", () => {
    const namesArray: string[] = [];
    dictionary.colors.forEach((color) => {
      namesArray.push(color[3]);
    });
    const namesSet = new Set(namesArray);
    const namesSetArray = Array.from(namesSet);
    expect(namesArray).toEqual(namesSetArray);
  });
});
