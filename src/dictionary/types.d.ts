interface IDictionaryHue {
  0: number;
  1: string;
}

interface IDictionaryNamed {
  0: string;
  1: string;
}

interface IDictionaryColor {
  0: number;
  1: number;
  2: number;
  3: string;
}

interface IDictionary {
  primaryHues: IDictionaryHue[];
  cssNamedColors: IDictionaryNamed[];
  colors: IDictionaryColor[];
}

interface IColor {
  color: TColorValue;
  name: string;
  space: TSpace;
}

interface IColorMatch extends IColor {
  difference: number;
}
