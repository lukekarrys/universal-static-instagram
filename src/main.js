'use strict';

import React from 'react';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import routes from './routes';

const {__INITIAL_DATA__} = window;
const createElement = (Component, props) => <Component {...props} {...__INITIAL_DATA__} />;
const history = new BrowserHistory();

React.render(
  <Router history={history} children={routes} createElement={createElement} />,
  document.getElementById('app')
);
