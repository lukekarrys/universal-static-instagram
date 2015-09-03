/* global __DEVTOOLS__ */

'use strict';

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from './routes';

let RD;

// Only require devtools based on flag so they dont get bundled
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  RD = require('redux-devtools/lib/react');
}

/*
 * If rendering on the client, the Provider needs initial data and the Router
 * needs history. If rendering on the server, then the router props are passed
 * in directly from Router.run so store/history aren't used.
 */
export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    router: PropTypes.object
  }

  render () {
    const {store, history, router} = this.props;
    return (
      <div>
        <Provider store={store}>
          {() => <Router history={history} children={routes} {...router} />}
        </Provider>
        {typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__ &&
          <RD.DebugPanel left={true} right={true} bottom={true}>
            <RD.DevTools store={store} monitor={RD.LogMonitor} />
          </RD.DebugPanel>
        }
      </div>
    );
  }
}
