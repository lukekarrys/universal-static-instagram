'use strict';

import React from 'react';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Iso from 'iso';
import routes from './routes';
import alt from './alt';
import createElement from './createAltContainer';

const history = new BrowserHistory();

Iso.bootstrap((state, _, container) => {
  const props = {history, createElement, children: routes};
  alt.bootstrap(state);
  React.render(<Router {...props} />, container);
});
