import { spaces } from "../spaces/spacesConfig";

class ColorFormatter {
  public formatColor(space: TSpace, color: TColorValue): string {
    let stringValue = "";

    const spaceDefinition = spaces.get(space);
    if (spaceDefinition) {
      spaceDefinition.parts.forEach((partDefinition, index) => {
        if (partDefinition.before) {
          stringValue += partDefinition.before;
        }
        stringValue += color[index];
        if (partDefinition.after) {
          stringValue += partDefinition.after;
        }
      });
    }

    return stringValue;
  }
}

export default new ColorFormatter();
