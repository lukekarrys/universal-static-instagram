'use strict';

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Root from './Root';

const history = new BrowserHistory();
const {__INITIAL_STATE__: state} = window;

React.render(<Root {...{history, state}} />, document.body);
