/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import {ReduxRouter} from 'redux-react-router';
import createHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import createStore from './store';

// Only require devtools based on flag so they dont get bundled
let DebugPanel, DevTools, LogMonitor;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  ({DebugPanel, DevTools, LogMonitor} = require('redux-devtools/lib/react'));
}

const {__INITIAL_STATE__: state} = window;
const store = createStore({state, createHistory});
const container = document.getElementById('container');

React.render((
  <div>
    <Provider store={store}>
      {() => <ReduxRouter />}
    </Provider>
    {typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__ &&
      <DebugPanel left={true} right={true} bottom={true}>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    }
  </div>
), container);
