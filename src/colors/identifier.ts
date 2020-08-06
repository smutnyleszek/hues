import validator from "./validator";

class ColorIdentifier {
  public identify(text: string): IColorValue | null {
    // cleanup whitespace
    text = text.trim();

    // drop semicolon if included by mistake
    if (text.endsWith(";")) {
      text = text.slice(0, text.length - 1).trimRight();
    }

    if (text.startsWith("#")) {
    }

    if (text.startsWith("rgb(") && text.endsWith(")")) {
      text = text.slice(3);
      text = text.slice(0, text.length - 1);
      text = text.replace(/\s/g, "");
      const colorValue: IColorValue = ["rgb", 0, 0, 0];
      text.split(",").forEach(val => {
        colorValue.push(parseInt(val, 10));
      });
      if (validator.isRgb(colorValue)) {
        return colorValue;
      }
    }

    if (text.startsWith("hsl(") && text.endsWith(")")) {
    }

    if (text.startsWith("hwb(") && text.endsWith(")")) {
    }

    return null;
  }
}

export default new ColorIdentifier();
