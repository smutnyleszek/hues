import * as dictionaryJsonData from "./dictionary.json";
const dictionary: IDictionary = dictionaryJsonData as any;
import converter from "../colors/converter";

class ColorMatcher {
  public matchColor(space: TSpace, color: TColorValue): IColorMatch {
    return this.matchDictionaryColor(space, color, dictionary.colors);
  }

  public matchHue(space: TSpace, color: TColorValue): IColorMatch {
    return this.matchDictionaryColor(space, color, dictionary.primaryHues);
  }

  private matchDictionaryColor(
    space: TSpace,
    color: TColorValue,
    dict: IDictionaryColor[]
  ): IColorMatch {
    const targetRgb = converter.convertFromTo(space, "rgb", color);
    const targetHsl = converter.convertFromTo(space, "hsl", color);

    const match = {
      color: this.getColorByIndex(0).color,
      difference: Infinity,
      name: this.getColorByIndex(0).name,
      space: "hsl" as TSpace
    };

    dict.forEach((dictColor: IDictionaryColor): void => {
      const dictHsl = [dictColor[0], dictColor[1], dictColor[2]];
      const differenceHsl = this.getHslDifference(targetHsl, dictHsl);

      const dictRgb = converter.convertFromTo("hsl", "rgb", dictHsl);
      const differenceRgb = this.getRgbDifference(targetRgb, dictRgb);

      const totalDifference = differenceRgb + differenceHsl * 2;

      if (totalDifference < match.difference) {
        match.color = dictHsl;
        match.difference = totalDifference;
        match.name = dictColor[3];
      }
    });
    return match;
  }

  private getRgbDifference(target: TColorValue, dict: TColorValue): number {
    const differenceR = Math.abs(Number(target[0]) - Number(dict[0]));
    const differenceG = Math.abs(Number(target[1]) - Number(dict[1]));
    const differenceB = Math.abs(Number(target[2]) - Number(dict[2]));
    return differenceR + differenceG + differenceB;
  }

  private getHslDifference(target: TColorValue, dict: TColorValue): number {
    let differenceH = Math.abs(Number(target[0]) - Number(dict[0]));
    let differenceS = Math.abs(Number(target[1]) - Number(dict[1]));
    const differenceL = Math.abs(Number(target[2]) - Number(dict[2]));

    // with only light or no light at all, saturation and hue are meaningless
    if (target[2] === 100 || target[2] === 0) {
      differenceH = 0;
      differenceS = 0;
    }

    // with zero saturation hue is meaningless
    if (target[1] === 0) {
      differenceH = 0;
    }

    return differenceH + differenceS + differenceL;
  }

  private findColorByName(name: string): IColor | undefined {
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
