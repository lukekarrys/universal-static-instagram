/* global __DEVTOOLS__ */

'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-react-router';
import thunk from 'redux-thunk';
import debugLogger from 'redux-logger';
import logger from 'andlog';
import api from '../helpers/api';
import reducer from '../reducers';
import routes from '../routes';

const middleware = applyMiddleware(thunk, api, debugLogger({logger}));
const storeEnhancers = [];

// Only require devtools based on flag so they dont get bundled
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers.push(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}

export default ({state, createHistory}) => {
  // Pass in createHistory as an option to allow for redux-react-router to be
  // initialized with different histories for server/client
  const router = reduxReactRouter({routes, createHistory});
  const store = compose(middleware, router, ...storeEnhancers)(createStore)(reducer, state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
