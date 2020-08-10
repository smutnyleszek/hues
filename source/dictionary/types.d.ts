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
  primaryHues: IDictionaryColor[];
  cssNamedColors: IDictionaryNamed[];
  colors: IDictionaryColor[];
}

interface IColor {
  color: IColorValue;
  name: string;
}

interface IColorMatch extends IColor {
  difference: number;
}
