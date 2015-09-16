/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import routes from './routes';
import createStore from './store/client';
import Root from './Root';
import 'basscss/css/basscss.css';

const store = createStore(window.__INITIAL_STATE__);
const container = document.getElementById('container');

// Only require devtools based on flag so they dont get bundled
let Debugger = null;
if (__DEVTOOLS__) {
  const {DebugPanel, DevTools, LogMonitor} = require('redux-devtools/lib/react');
  Debugger = (
    <DebugPanel left={true} right={true} bottom={true}>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  );
}

React.render(<Root store={store} routes={routes}>{Debugger}</Root>, container);
