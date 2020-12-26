import { createAction } from 'redux-actions';
import {
  ISetSystemColor,
  ISetSystemColors,
  ISetSystemExtraPoints,
  ISetSystemRandomness, ISetSystemSeed,
} from '@type/actions';

enum Type {
  SET_COLORS = 'SYSTEM/SET_COLORS',
  SET_COLOR = 'SYSTEM/SET_COLOR',
  SET_RANDOMNESS = 'SYSTEM/SET_RANDOMNESS',
  SET_EXTRA_POINTS = 'SYSTEM/SET_EXTRA_POINTS',
  SET_SEED = 'SYSTEM/SET_SEED',
}

const setColors = createAction(Type.SET_COLORS, (colors: ISetSystemColors) => ({ colors }));
const setColor = createAction<ISetSystemColor>(Type.SET_COLOR);
const setRandomness = createAction(
  Type.SET_RANDOMNESS, (randomness: ISetSystemRandomness) => ({ randomness }),
);
const setExtraPoints = createAction(
  Type.SET_EXTRA_POINTS, (extraPoints: ISetSystemExtraPoints) => ({ extraPoints }),
);
const setSeed = createAction(
  Type.SET_SEED, (seed: ISetSystemSeed) => ({ seed }),
);

export const SystemActions = {
  Type,
  setColors,
  setColor,
  setRandomness,
  setExtraPoints,
  setSeed,
};
