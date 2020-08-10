import slugifier from "../misc/slugifier";
import { spaces } from "../spaces/spacesConfig";
import validator from "./validator";

class ColorFormatter {
  public formatColor(color: IColorValue): string {
    let stringValue = "";

    if (!validator.isValid(color)) {
      return stringValue;
    }

    const spaceDefinition = spaces.get(color[0]);
    if (spaceDefinition) {
      spaceDefinition.parts.forEach((partDefinition, index) => {
        if (partDefinition.before) {
          stringValue += partDefinition.before;
        }
        stringValue += color[index + 1];
        if (partDefinition.after) {
          stringValue += partDefinition.after;
        }
      });
    }

    return stringValue;
  }

  public formatVariable(name: string, color: IColorValue): string {
    return `--c-${slugifier.slugify(name)}: ${this.formatColor(color)};`;
  }
}

export default new ColorFormatter();
