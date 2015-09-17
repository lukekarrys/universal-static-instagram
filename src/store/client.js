/* global __DEVTOOLS__ */

'use strict';

import createHistory from 'history/lib/createBrowserHistory';
import debugLogger from 'redux-logger';
import logger from 'andlog';
import createStore from './';

// Only require devtools based on flag so they dont get bundled
let storeEnhancers;
if (__DEVTOOLS__) {
  const {devTools, persistState} = require('redux-devtools');
  storeEnhancers = [
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ];
}

const finalCreateStore = createStore({
  middleware: [debugLogger({logger})],
  router: {createHistory},
  storeEnhancers
});

export default (state) => {
  const store = finalCreateStore(state);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
};
