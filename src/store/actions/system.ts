import { createAction } from 'redux-actions';
import {
  IRemoveSystemBlobId,
  IResetSystemProgress,
  ISetSystemActiveBlobId,
  ISetSystemBackgroundSrc,
  ISetSystemColor,
  ISetSystemColors,
  ISetSystemDelay,
  ISetSystemDuration,
  ISetSystemExtraPoints,
  ISetSystemFps,
  ISetSystemOpacity,
  ISetSystemQuality,
  ISetSystemRandomness,
  ISetSystemSeed,
  ISetSystemSize,
  ISetSystemSvg,
  IUpdateSystemProgress,
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
  SET_ACTIVE_BLOB_ID = 'SYSTEM/SET_ACTIVE_BLOB_ID',
  SWITCH_IS_REC = 'SYSTEM/SWITCH_IS_REC',
  ADD_BLOB = 'SYSTEM/ADD_BLOB',
  REMOVE_BLOB = 'SYSTEM/REMOVE_BLOB',
  SET_BACKGROUND_SRC = 'SYSTEM/SET_BACKGROUND_SRC',
  UPDATE_PROGRESS = 'SYSTEM/UPDATE_PROGRESS',
  RESET_PROGRESS = 'SYSTEM/RESET_PROGRESS',
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
const setActiveBlobId = createAction(
  Type.SET_ACTIVE_BLOB_ID, (activeBlobId: ISetSystemActiveBlobId) => ({ activeBlobId }),
);
const switchIsRec = createAction(Type.SWITCH_IS_REC);
const addBlob = createAction(Type.ADD_BLOB);
const removeBlob = createAction(
  Type.REMOVE_BLOB, (id: IRemoveSystemBlobId) => ({ id }),
);
const setBackgroundSrc = createAction(
  Type.SET_BACKGROUND_SRC, (backgroundSrc: ISetSystemBackgroundSrc) => ({ backgroundSrc }),
);
const updateProgress = createAction<IUpdateSystemProgress>(Type.UPDATE_PROGRESS);
const resetProgress = createAction(
  Type.RESET_PROGRESS, (id: IResetSystemProgress) => ({ id }),
);

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
  setActiveBlobId,
  switchIsRec,
  addBlob,
  removeBlob,
  setBackgroundSrc,
  updateProgress,
  resetProgress,
};
