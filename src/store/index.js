'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import apiMiddleware from '../helpers/api';
import reducers from '../reducers';

const configureStore = (state) => applyMiddleware(
  thunkMiddleware,
  apiMiddleware,
  createLogger({
    predicate: () => process.env.NODE_ENV !== 'production'
  })
)(createStore)(reducers, state);

export default configureStore;
