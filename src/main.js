/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import Router from 'react-router';
import {Provider} from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';
import createStore from './store';
import routes from './routes';

const store = createStore(window.__INITIAL_STATE__ || {});

// Only require devtools based on flag so they dont get bundled
let DebugPanel, DevTools, SliderMonitor;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  ({DebugPanel, DevTools} = require('redux-devtools/lib/react'));
  SliderMonitor = require('redux-slider-monitor');
}

React.render((
  <div>
    <Provider store={store}>
      {() => <Router history={createHistory()}>{routes}</Router>}
    </Provider>
    {typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__ &&
      <DebugPanel left={true} right={true} bottom={true}>
        <DevTools store={store} monitor={SliderMonitor} />
      </DebugPanel>
    }
  </div>
), document.getElementById('container'));
