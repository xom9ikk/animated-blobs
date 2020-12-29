import { handleActions } from 'redux-actions';
import { ISystem } from '@type/entitines';
import { useUtils } from '@use/utils';
import { SystemActions } from '../actions';

const { getRandomInt } = useUtils();

const DEFAULT_BLOB = () => ({
  colors: ['#8A3FFC', null],
  randomness: getRandomInt(2, 10),
  extraPoints: getRandomInt(2, 15),
  seed: Math.random(),
  opacity: getRandomInt(30, 50),
  duration: getRandomInt(350, 1500),
  delay: 0,
});

const initialState = {
  backgroundSvg: `/svg/wave-${getRandomInt(0, 6)}.svg`,
  activeBlobId: 'blob-0',
  blobs: [{
    id: 'blob-0',
    ...DEFAULT_BLOB(),
  }],
  svg: '',
  quality: 10,
  fps: 30,
  size: 440,
  isRec: false,
  createdBlobCount: 0,
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
  [SystemActions.Type.SET_ACTIVE_BLOB_ID]:
        (state, action) => ({ ...state, activeBlobId: action.payload.activeBlobId }),
  [SystemActions.Type.SWITCH_IS_REC]:
        (state) => ({ ...state, isRec: !state.isRec }),
  [SystemActions.Type.ADD_BLOB]:
        (state) => {
          const blobId = `blob-${state.createdBlobCount + 1}`;
          return {
            ...state,
            blobs: [
              ...state.blobs,
              {
                ...DEFAULT_BLOB(),
                id: blobId,
              }],
            activeBlobId: blobId,
            createdBlobCount: state.createdBlobCount + 1,
          };
        },
  [SystemActions.Type.REMOVE_BLOB]:
        (state, action) => ({
          ...state,
          blobs: state.blobs.filter((blob) => blob.id !== action.payload.id),
        }),
}, initialState);
