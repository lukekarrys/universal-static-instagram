'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {partial} from 'lodash';
import thunk from 'redux-thunk';
import api from '../helpers/api';
import reducer from '../reducers';

export default ({middleware = [], storeEnhancers = []} = {}) => {
  // Allow passing in of options for middleware, router and extra store
  // enchancers for customization from client/server while always keeping
  // the core options in place
  const finalCreateStore = compose(
    applyMiddleware(thunk, api, ...middleware),
    ...storeEnhancers
  )(createStore);

  // Our reducer also doesnt change between envs so partially apply it to the
  // store creator
  return partial(finalCreateStore, reducer);
};
