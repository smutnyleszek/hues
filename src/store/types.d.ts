interface IState {
  color: TColorValue;
  match: IColorMatch;
  space: TSpace;
  version: string;
}

interface ISetColorPayload {
  space: TSpace;
  color: TColorValue;
}
