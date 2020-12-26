import { handleActions } from 'redux-actions';
import { ISystem } from '@type/entitines';
import { SystemActions } from '../actions';

const initialState = {
  colors: ['#8A3FFC', null],
  randomness: 3,
  extraPoints: 5,
  seed: Math.random(),
  svg: '',
};

export const SystemReducer = handleActions<ISystem, any>({
  [SystemActions.Type.SET_COLORS]:
        (state, action) => ({ ...state, colors: action.payload.colors }),
  [SystemActions.Type.SET_COLOR]:
        (state, action) => {
          const colors = state.colors.map((color, index) => (
            index === action.payload.index
              ? action.payload.color
              : color
          ));
          return { ...state, colors };
        },
  [SystemActions.Type.SET_RANDOMNESS]:
        (state, action) => ({ ...state, randomness: action.payload.randomness }),
  [SystemActions.Type.SET_EXTRA_POINTS]:
        (state, action) => ({ ...state, extraPoints: action.payload.extraPoints }),
  [SystemActions.Type.SET_SEED]:
        (state, action) => ({ ...state, seed: action.payload.seed }),
  [SystemActions.Type.SET_SVG]:
        (state, action) => ({ ...state, svg: action.payload.svg }),
}, initialState);
