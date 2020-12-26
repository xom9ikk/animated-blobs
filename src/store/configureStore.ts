import {
  createStore, applyMiddleware, Middleware,
} from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '@store/reducers';

const bindMiddleware = (middleware: Array<Middleware>) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => createStore(rootReducer, bindMiddleware([]));

export const wrapper = createWrapper(initStore);
