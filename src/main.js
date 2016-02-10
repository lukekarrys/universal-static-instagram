'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes';
import createStore from './store/client';
import 'basscss/css/basscss.css';
import './styles.css';

const {__INITIAL_STATE__: initialState} = window;
const store = createStore({initialState});
const history = syncHistoryWithStore(browserHistory, store);

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
, document.getElementById('container'));
