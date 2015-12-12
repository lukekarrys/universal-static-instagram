/* global __DEVTOOLS__ */

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
  const {DebugPanel, DevTools, LogMonitor} = require('redux-devtools/lib/react');
  debuggers = (
    <DebugPanel left right bottom>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  );
}

render(
  <div>
    <Provider store={store}>
      <Router history={history}>{routes}</Router>
    </Provider>
    {debuggers}
  </div>
, container);
