/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import {ReduxRouter} from 'redux-react-router';
import createHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import createStore from './store';

// Only require devtools based on flag so they dont get bundled
let DebugPanel, DevTools;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  ({DebugPanel, DevTools} = require('redux-devtools/lib/react'));
}

const store = createStore(window.__INITIAL_STATE__ || {}, {createHistory});
const container = document.getElementById('container');

React.render((
  <div>
    <Provider store={store}>
      {() => <ReduxRouter />}
    </Provider>
    {typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__ &&
      <DebugPanel left={true} right={true} bottom={true}>
        <DevTools store={store} monitor={require('redux-slider-monitor')} />
      </DebugPanel>
    }
  </div>
), container);
