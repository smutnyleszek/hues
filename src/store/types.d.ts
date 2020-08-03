interface IState {
  color: TColorValue;
  match: IColorMatch;
  primaryHue: IColorMatch;
  space: TSpace;
  version: string;
}

interface ISetColorPayload {
  space: TSpace;
  color: TColorValue;
}
