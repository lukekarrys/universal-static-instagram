'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-react-router/lib/server';
import thunk from 'redux-thunk';
import api from '../helpers/api';
import reducer from '../reducers';
import routes from '../routes';

const finalCreateStore = compose(
  applyMiddleware(thunk, api),
  reduxReactRouter({routes})
)(createStore);

export default (state) => finalCreateStore(reducer, state);
