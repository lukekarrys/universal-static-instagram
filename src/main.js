'use strict';

import React from 'react';
import {Router} from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Iso from 'iso';
import routes from './routes';
import alt from './alt';

const history = new BrowserHistory();

Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state);
  React.render(
    <Router history={history} children={routes} />,
    container
  );
});
