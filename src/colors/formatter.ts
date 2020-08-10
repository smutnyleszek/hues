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
}

export default new ColorFormatter();
