'use strict';

import {compose, createStore, applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-react-router/lib/server';
import thunk from 'redux-thunk';
import api from '../helpers/api';
import reducer from '../reducers';
import routes from '../routes';

export default (state) => compose(
  applyMiddleware(thunk, api),
  reduxReactRouter({routes})
)(createStore)(reducer, state);
