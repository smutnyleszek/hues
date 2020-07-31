type TSpaceName = "hex" | "rgb" | "hsl" | "hwb";

interface ISpaceDefinition {
  parts: ISpacePart[];
}

type TSpacePartName =
  | "red"
  | "green"
  | "blue"
  | "hue"
  | "saturation"
  | "lightness"
  | "whiteness"
  | "blackness";

type TSpacePartType = "hexadecimal" | "integer";

interface ISpacePart {
  after?: string;
  before?: string;
  partName: TSpacePartName;
  partType: TSpacePartType;
  range: number[];
}
