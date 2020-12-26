export type IColor = string | null;
export type IColors = Array<IColor>;

export interface ISystem {
  colors: IColors;
  randomness: number;
  extraPoints: number;
  seed: number;
}
