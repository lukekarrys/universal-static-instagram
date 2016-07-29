'use strict';

import createStore from './index';

const storeEnhancers = [];
const middleware = [];

// Only require devtools/logger based on flag so they dont get bundled
if (__DEVTOOLS__) {
  storeEnhancers.push(
    require('../containers/DevTools').instrument()
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
