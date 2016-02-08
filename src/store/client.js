'use strict';

import createStore from './index';

const storeEnhancers = [];
const middleware = [];

// Only require devtools/logger based on flag so they dont get bundled
if (__DEVTOOLS__) {
  const {persistState} = require('redux-devtools');
  const DevTools = require('../containers/DevTools');
  storeEnhancers.push(
    DevTools.instrument(),
    persistState(() => {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length > 0) ? matches[1] : null;
    })
  );
}

if (__LOGGER__) {
  middleware.push(require('redux-logger')());
}

export default ({initialState = {}, routerMiddleware} = {}) => {
  if (routerMiddleware) middleware.push(routerMiddleware);

  const store = createStore({initialState, middleware, storeEnhancers});

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
