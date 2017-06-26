'use strict';

import './main.css';

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routes from './routes';
import createStore from './store/client';
import {pageview} from './helpers/analytics';
import history from './helpers/history';

const {__INITIAL_STATE__: initialState} = window;
const store = createStore({initialState});

history.listen(pageview);
pageview(history.location);

render((
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
), document.getElementById('container'));
