/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import {ReduxRouter} from 'redux-react-router';
import createHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import createStore from './store';

const store = createStore(window.__INITIAL_STATE__ || {}, {createHistory});

// Only require devtools based on flag so they dont get bundled
let DebugPanel, DevTools, SliderMonitor;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  ({DebugPanel, DevTools} = require('redux-devtools/lib/react'));
  SliderMonitor = require('redux-slider-monitor');
}

React.render((
  <div>
    <Provider store={store}>
      {() => <ReduxRouter />}
    </Provider>
    {typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__ &&
      <DebugPanel left={true} right={true} bottom={true}>
        <DevTools store={store} monitor={SliderMonitor} />
      </DebugPanel>
    }
  </div>
), document.getElementById('container'));
