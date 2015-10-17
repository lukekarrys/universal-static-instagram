/* global __DEVTOOLS__ */

'use strict';

import React from 'react';
import {render} from 'react-dom';
import routes from './routes';
import createStore from './store/client';
import Root from './Root';
import 'basscss/css/basscss.css';

const store = createStore(window.__INITIAL_STATE__);
const container = document.getElementById('container');

// Only require devtools based on flag so they dont get bundled
let children = null;
if (__DEVTOOLS__) {
  const {DebugPanel, DevTools, LogMonitor} = require('redux-devtools/lib/react');
  children = (
    <DebugPanel left={true} right={true} bottom={true}>
      <DevTools store={store} monitor={LogMonitor} visibleOnLoad={false} />
    </DebugPanel>
  );
}

render(<Root {...{store, routes, children}} />, container);
