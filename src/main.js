'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Provider as RebassProvider} from 'rebass';
import {injectGlobal} from 'styled-components';
import Routes from './routes';
import createStore from './store/client';
import {pageview} from './helpers/analytics';
import history from './helpers/history';

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

const {__INITIAL_STATE__: initialState} = window;
const store = createStore({initialState});

history.listen(pageview);
pageview(history.location);

render((
  <RebassProvider>
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  </RebassProvider>
), document.getElementById('container'));
