import { combineReducers } from 'redux';
import { IRootState } from '@store/state';
import { SystemReducer } from '@store/reducers/system';

export const rootReducer = combineReducers<IRootState>({
  system: SystemReducer as any,
});
