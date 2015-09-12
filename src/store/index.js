/* global __DEVTOOLS__ */

'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import debugLogger from 'redux-logger';
import logger from 'andlog';
import api from '../helpers/api';
import reducer from '../reducers';

const storeEnhancers = [applyMiddleware(thunk, api, debugLogger({logger}))];

// Only require devtools based on flag so they dont get bundled
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers.push(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}

const configureStore = (state) => {
  const store = compose(...storeEnhancers)(createStore)(reducer, state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};

export default configureStore;
