import { IRootState } from '@store/state';

export const getColors = (state: IRootState) => state.system.colors;
export const getRandomness = (state: IRootState) => state.system.randomness;
export const getExtraPoints = (state: IRootState) => state.system.extraPoints;
export const getSeed = (state: IRootState) => state.system.seed;
export const getSvg = (state: IRootState) => state.system.svg;
