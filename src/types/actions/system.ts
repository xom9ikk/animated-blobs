import { IColor } from '@type/entitines';

export type ISetSystemColors = [IColor] | [IColor, IColor];
export interface ISetSystemColor {
  color: IColor;
  index: number;
}
export type ISetSystemRandomness = number;
export type ISetSystemExtraPoints = number;
export type ISetSystemSeed = number;
