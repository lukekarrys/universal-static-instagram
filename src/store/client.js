'use strict';

import createStore from './index';

const storeEnhancers = [];
const middleware = [];

if (__LOGGER__) {
  middleware.push(require('redux-logger').createLogger({collapsed: true}));
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
