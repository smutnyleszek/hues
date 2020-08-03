interface IState {
  color: TColorValue;
  primaryHue: IColorMatch;
  match: IColorMatch;
  space: TSpace;
  version: string;
}

interface ISetColorPayload {
  space: TSpace;
  color: TColorValue;
}
