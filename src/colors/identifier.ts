import matcher from "../dictionary/matcher";
import validator from "./validator";

class ColorIdentifier {
  public identify(text: string): IColorValue | null {
    const finalColor: IColorValue = ["hsl", -1, -1, -1];

    // cleanup whitespace
    text = text.trim();

    // drop semicolon that could easily be included by mistake
    if (text.endsWith(";")) {
      text = text.slice(0, -1).trimRight();
    }

    // hex case
    if (text.startsWith("#") && [4, 7].includes(text.length)) {
      finalColor[0] = "hex";
      if (text.length === 4) {
        finalColor[1] = text[1].repeat(2);
        finalColor[2] = text[2].repeat(2);
        finalColor[3] = text[3].repeat(2);
      }
      if (text.length === 7) {
        finalColor[1] = text.slice(1, 3);
        finalColor[2] = text.slice(3, 5);
        finalColor[3] = text.slice(5, 7);
      }
      if (validator.isValid(finalColor)) {
        return finalColor;
      }
    }

    // rgb case
    if (text.startsWith("rgb(") && text.endsWith(")")) {
      finalColor[0] = "rgb";
      this.applyValues(finalColor, text);
      if (validator.isValid(finalColor)) {
        return finalColor;
      }
    }

    // hsl case
    if (text.startsWith("hsl(") && text.endsWith(")")) {
      finalColor[0] = "hsl";
      this.applyValues(finalColor, text);
      if (validator.isValid(finalColor)) {
        return finalColor;
      }
    }

    // hwb case
    if (text.startsWith("hwb(") && text.endsWith(")")) {
      finalColor[0] = "hwb";
      this.applyValues(finalColor, text);
      if (validator.isValid(finalColor)) {
        return finalColor;
      }
    }

    // named color case
    const named = matcher.findColorByName(text);
    if (named) {
      return named.color;
    }

    return null;
  }

  private applyValues(color: IColorValue, text: string): void {
    // remove space prefix and parens opening
    text = text.slice(4);
    // remove parens closing
    text = text.slice(0, -1);
    // remove whitespace
    text = text.replace(/\s/g, "");

    text.split(",").forEach((part, index) => {
      if (["hsl", "hwb"].includes(color[0])) {
        if ([1, 2].includes(index) && part.endsWith("%")) {
          color[index + 1] = parseInt(part.slice(0, -1), 10);
        } else if (index === 0) {
          color[index + 1] = parseInt(part, 10);
        }
      } else {
        color[index + 1] = parseInt(part, 10);
      }
    });
  }
}

export default new ColorIdentifier();
