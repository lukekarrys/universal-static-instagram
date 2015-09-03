'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import logger from 'andlog';
import apiMiddleware from '../helpers/api';
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware,
  createLogger({logger})
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
