import { createAction } from 'redux-actions';
import {
  ISetSystemColor,
  ISetSystemColors, ISetSystemDelay, ISetSystemDuration,
  ISetSystemExtraPoints, ISetSystemFps, ISetSystemOpacity, ISetSystemQuality,
  ISetSystemRandomness, ISetSystemSeed, ISetSystemSize, ISetSystemSvg,
} from '@type/actions';

enum Type {
  SET_COLORS = 'SYSTEM/SET_COLORS',
  SET_COLOR = 'SYSTEM/SET_COLOR',
  SET_RANDOMNESS = 'SYSTEM/SET_RANDOMNESS',
  SET_EXTRA_POINTS = 'SYSTEM/SET_EXTRA_POINTS',
  SET_SEED = 'SYSTEM/SET_SEED',
  SET_OPACITY = 'SYSTEM/SET_OPACITY',
  SET_DURATION = 'SYSTEM/SET_DURATION',
  SET_DELAY = 'SYSTEM/SET_DELAY',
  SET_SVG = 'SYSTEM/SET_SVG',
  SET_QUALITY = 'SYSTEM/SET_QUALITY',
  SET_FPS = 'SYSTEM/SET_FPS',
  SET_SIZE = 'SYSTEM/SET_SIZE',
  SWITCH_IS_REC = 'SYSTEM/SWITCH_IS_REC',
}

const setColors = createAction<ISetSystemColors>(Type.SET_COLORS);
const setColor = createAction<ISetSystemColor>(Type.SET_COLOR);
const setRandomness = createAction<ISetSystemRandomness>(Type.SET_RANDOMNESS);
const setExtraPoints = createAction<ISetSystemExtraPoints>(Type.SET_EXTRA_POINTS);
const setSeed = createAction<ISetSystemSeed>(Type.SET_SEED);
const setOpacity = createAction<ISetSystemOpacity>(Type.SET_OPACITY);
const setDuration = createAction<ISetSystemDuration>(Type.SET_DURATION);
const setDelay = createAction<ISetSystemDelay>(Type.SET_DELAY);
const setSvg = createAction(
  Type.SET_SVG, (svg: ISetSystemSvg) => ({ svg }),
);
const setQuality = createAction(
  Type.SET_QUALITY, (quality: ISetSystemQuality) => ({ quality }),
);
const setFps = createAction(
  Type.SET_FPS, (fps: ISetSystemFps) => ({ fps }),
);
const setSize = createAction(
  Type.SET_SIZE, (size: ISetSystemSize) => ({ size }),
);
const switchIsRec = createAction(Type.SWITCH_IS_REC);

export const SystemActions = {
  Type,
  setColors,
  setColor,
  setRandomness,
  setExtraPoints,
  setSeed,
  setOpacity,
  setDuration,
  setDelay,
  setSvg,
  setQuality,
  setFps,
  setSize,
  switchIsRec,
};
