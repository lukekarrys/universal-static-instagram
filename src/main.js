'use strict';

import React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {syncReduxAndRouter} from 'redux-simple-router';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import createStore from './store/client';
import 'basscss/css/basscss.css';

const store = createStore(window.__INITIAL_STATE__);
const history = createBrowserHistory();
const container = document.getElementById('container');

syncReduxAndRouter(history, store);

// Only require devtools based on flag so they dont get bundled
let debuggers = null;
if (__DEVTOOLS__) {
  const DevTools = require('./containers/DevTools');
  debuggers = (<DevTools />);
}

render(
  <Provider store={store}>
    <div>
      <Router history={history}>{routes}</Router>
      {debuggers}
    </div>
  </Provider>
, container);
