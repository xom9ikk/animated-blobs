import { combineReducers } from 'redux';
import { IRootState } from '@store/state';
import { SystemReducer } from './system';

export const rootReducer = combineReducers<IRootState>({
  system: SystemReducer as any,
});
