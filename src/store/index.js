/* global __DEVTOOLS__ */

'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import logger from 'andlog';
import apiMiddleware from '../helpers/api';
import reducer from '../reducers';

let finalCreateStore;
const middleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware,
  createLogger({logger})
);

if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  finalCreateStore = compose(
    middleware,
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
}
else {
  finalCreateStore = middleware(createStore);
}

const configureStore = (state) => {
  const store = finalCreateStore(reducer, state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};

export default configureStore;
