'use strict';

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Root from './Root';
import store from './store';

const history = new BrowserHistory();
const {__INITIAL_STATE__: state} = window;

React.render(<Root {...{history, store: store(state)}} />, document.body);
