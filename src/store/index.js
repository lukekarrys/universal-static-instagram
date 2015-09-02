'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from '../helpers/api';
import reducer from '../reducers';

const devOnly = () => process.env.NODE_ENV !== 'production';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware,
  createLogger({predicate: devOnly})
)(createStore);

const configureStore = (state) => {
  const store = createStoreWithMiddleware(reducer, state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};

export default configureStore;
