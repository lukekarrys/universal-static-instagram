/* global __DEVTOOLS__ */

'use strict';

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from './routes';

// Only require devtools based on flag so they dont get bundled
let DebugPanel, DevTools, SliderMonitor;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
  ({DebugPanel, DevTools} = require('redux-devtools/lib/react'));
  SliderMonitor = require('redux-slider-monitor');
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
          <DebugPanel left={true} right={true} bottom={true}>
            <DevTools store={store} monitor={SliderMonitor} />
          </DebugPanel>
        }
      </div>
    );
  }
}
