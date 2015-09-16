/* global __DEVTOOLS__ */

'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import createHistory from 'history/lib/createBrowserHistory';
import {reduxReactRouter} from 'redux-react-router';
import thunk from 'redux-thunk';
import debugLogger from 'redux-logger';
import logger from 'andlog';
import api from '../helpers/api';
import reducer from '../reducers';

const storeEnhancers = [];

// Only require devtools based on flag so they dont get bundled
if (__DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers.push(
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}

const finalCreateStore = compose(
  applyMiddleware(thunk, api, debugLogger({logger})),
  reduxReactRouter({createHistory}),
  ...storeEnhancers
)(createStore);

export default (state) => {
  const store = finalCreateStore(reducer, state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
