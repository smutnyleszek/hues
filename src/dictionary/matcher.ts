import * as dictionaryJsonData from "./dictionary.json";
const dictionary: IDictionary = dictionaryJsonData as any;
import converter from "../colors/converter";

class ColorMatcher {
  // returns hsl color
  public matchColor(space: TSpace, color: TColorValue): IColorMatch {
    const targetRgb = converter.convertFromTo(space, "rgb", color);
    const targetHsl = converter.convertFromTo(space, "hsl", color);

    const match = {
      color: this.getColorByIndex(0).color,
      difference: Infinity,
      name: this.getColorByIndex(0).name,
      space: "hsl" as TSpace
    };

    dictionary.colors.forEach((dictColor: IDictionaryColor): void => {
      const dictHsl = [dictColor[0], dictColor[1], dictColor[2]];
      const differenceHsl = this.getHslDifference(targetHsl, dictHsl);

      const dictRgb = converter.convertFromTo("hsl", "rgb", dictHsl);
      const differenceRgb = this.getRgbDifference(targetRgb, dictRgb);

      const totalDifference = differenceRgb + differenceHsl;

      if (totalDifference < match.difference) {
        match.color = dictHsl;
        match.difference = totalDifference;
        match.name = dictColor[3];
      }
    });
    return match;
  }

  private getRgbDifference(first: TColorValue, second: TColorValue): number {
    const differenceR = Math.abs(Number(first[0]) - Number(second[0]));
    const differenceG = Math.abs(Number(first[1]) - Number(second[1]));
    const differenceB = Math.abs(Number(first[2]) - Number(second[2]));
    return differenceR + differenceG + differenceB;
  }

  private getHslDifference(first: TColorValue, second: TColorValue): number {
    const differenceH = Math.abs(Number(first[0]) - Number(second[0]));
    const differenceS = Math.abs(Number(first[1]) - Number(second[1]));
    const differenceL = Math.abs(Number(first[2]) - Number(second[2]));
    // hue is most important here
    return differenceH * 1.5 + differenceS + differenceL;
  }

  private findColor(name: string): IColor | undefined {
    const lowerName = String(name).toLowerCase();
    const found = dictionary.colors.find(dictionaryColor => {
      return String(dictionaryColor[3]).toLowerCase() === lowerName;
    });
    if (found) {
      return {
        color: [found[0], found[1], found[2]],
        name: found[3],
        space: "hsl"
      };
    } else {
      return undefined;
    }
  }

  private getColorByIndex(index: number): IColor {
    const dictColor = dictionary.colors[index];
    return {
      color: [dictColor[0], dictColor[1], dictColor[2]],
      name: dictColor[3],
      space: "hsl"
    };
  }
}

export default new ColorMatcher();
