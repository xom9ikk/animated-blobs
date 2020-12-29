import { IColor } from '@type/entitines';

export type ISetSystemColors = {
  id: string;
  colors: [IColor] | [IColor, IColor];
};
export interface ISetSystemColor {
  id: string;
  color: IColor;
  index: number;
}
export interface ISetSystemRandomness {
  id: string;
  randomness: number;
}
export interface ISetSystemExtraPoints {
  id: string;
  extraPoints: number;
}
export interface ISetSystemSeed {
  id: string;
  seed: number;
}
export interface ISetSystemOpacity {
  id: string;
  opacity: number;
}
export interface ISetSystemDuration {
  id: string;
  duration: number;
}
export interface ISetSystemDelay {
  id: string;
  delay: number;
}

export type ISetSystemSvg = string;
export type ISetSystemQuality = number;
export type ISetSystemFps = number;
export type ISetSystemActiveBlobId = string;
export type ISetSystemSize = number;
