import { handleActions } from 'redux-actions';
import { ISystem } from '@type/entitines';
import { SystemActions } from '../actions';

const initialState = {
  activeBlobId: 'blob-0',
  blobs: [{
    id: 'blob-0',
    colors: ['#8A3FFC', null],
    randomness: 3,
    extraPoints: 5,
    seed: Math.random(),
    opacity: 100,
    duration: 1000,
    delay: 0,
  }, {
    id: 'blob-2',
    colors: ['#ff3344', '#aa3355'],
    randomness: 23,
    extraPoints: 33,
    seed: Math.random(),
    opacity: 33,
    duration: 1000,
    delay: 2000,
  }],
  svg: '',
  quality: 70,
  fps: 30,
  size: 440,
  isRec: false,
};

export const SystemReducer = handleActions<ISystem, any>({
  [SystemActions.Type.SET_COLORS]:
        (state, action) => ({
          ...state,
          blobs: state.blobs.map((blob) => {
            if (blob.id === action.payload.id) {
              return {
                ...blob,
                colors: action.payload.colors,
              };
            }
            return {
              ...blob,
            };
          }),
        }),
  [SystemActions.Type.SET_COLOR]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            const colors = blob.colors.map((color, index) => (
              index === action.payload.index
                ? action.payload.color
                : color
            ));
            return { ...blob, colors };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_RANDOMNESS]:
        (state, action) => ({
          ...state,
          blobs: state.blobs.map((blob) => {
            if (blob.id === action.payload.id) {
              return {
                ...blob,
                randomness: action.payload.randomness,
              };
            }
            return {
              ...blob,
            };
          }),
        }),
  [SystemActions.Type.SET_EXTRA_POINTS]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            return {
              ...blob,
              extraPoints: action.payload.extraPoints,
            };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_SEED]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            return {
              ...blob,
              seed: action.payload.seed,
            };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_OPACITY]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            return {
              ...blob,
              opacity: action.payload.opacity,
            };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_DURATION]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            return {
              ...blob,
              duration: action.payload.duration,
            };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_DELAY]:
      (state, action) => ({
        ...state,
        blobs: state.blobs.map((blob) => {
          if (blob.id === action.payload.id) {
            return {
              ...blob,
              delay: action.payload.delay,
            };
          }
          return {
            ...blob,
          };
        }),
      }),
  [SystemActions.Type.SET_SVG]:
        (state, action) => ({ ...state, svg: action.payload.svg }),
  [SystemActions.Type.SET_QUALITY]:
        (state, action) => ({ ...state, quality: action.payload.quality }),
  [SystemActions.Type.SET_FPS]:
        (state, action) => ({ ...state, fps: action.payload.fps }),
  [SystemActions.Type.SET_SIZE]:
        (state, action) => ({ ...state, size: action.payload.size }),
  [SystemActions.Type.SWITCH_IS_REC]:
        (state) => ({ ...state, isRec: !state.isRec }),
}, initialState);
