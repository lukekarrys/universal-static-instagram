'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {reduxReactRouter as reduxReactRouterServer} from 'redux-react-router/lib/server';
import {reduxReactRouter} from 'redux-react-router';
import partial from 'lodash/function/partial';
import thunk from 'redux-thunk';
import api from '../helpers/api';
import reducer from '../reducers';

export default ({middleware = [], router = {}, storeEnhancers = []}) => {
  // Allow passing in of options for middleware, router and extra store
  // enchancers for customization from client/server while always keeping
  // the core options in place
  const finalCreateStore = compose(
    applyMiddleware(thunk, api, ...middleware),
    router.routes ? reduxReactRouterServer(router) : reduxReactRouter(router),
    ...storeEnhancers
  )(createStore);

  // Our reducer also doesnt change between envs so partiall apply it to the
  // store creator
  return partial(finalCreateStore, reducer);
};
