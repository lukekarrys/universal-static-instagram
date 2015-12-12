'use strict';

import createStore from './index';

let storeEnhancers = [];
let middleware = [];

// Only require devtools/logger based on flag so they dont get bundled
if (__DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers = [
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

if (__LOGGER__) {
  middleware = [require('redux-logger')()];
}

const finalCreateStore = createStore({middleware, storeEnhancers});

export default (state) => {
  const store = finalCreateStore(state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
