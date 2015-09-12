/* global __DEVTOOLS__ */

'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-react-router';
import thunk from 'redux-thunk';
import debugLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import logger from 'andlog';
import api from '../helpers/api';
import reducer from '../reducers';
import routes from '../routes';

const storeEnhancers = [
  applyMiddleware(thunk, api, debugLogger({logger})),
  reduxReactRouter({
    routes,
    createHistory
  })
];

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
