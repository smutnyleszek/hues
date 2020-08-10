interface IState {
  color: IColorValue;
  match: IColorMatch;
  primaryHue: IColorMatch;
  version: string;
}

interface ISetColorPayload {
  color: IColorValue;
}
