'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import api from '../helpers/api';
import reducer from '../reducers';

export default ({initialState = {}, middleware = [], storeEnhancers = []} = {}) =>
  // Allow passing in of options for middleware, router and extra store
  // enchancers for customization from client/server while always keeping
  // the core options in place
  createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk, api, ...middleware),
      ...storeEnhancers
    )
  );
