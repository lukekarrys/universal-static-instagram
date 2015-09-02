'use strict';

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Router} from 'react-router';
import routes from './routes';

/*
 * If rendering on the client, the Provider needs initial data and the Router
 * needs history. If rendering on the server, then the router props are passed
 * in directly from Router.run so store/history aren't used.
 */
export default class Root extends Component {
  static propTypes = {
    state: PropTypes.object,
    history: PropTypes.object,
    router: PropTypes.object
  }

  render () {
    const {state, history, router} = this.props;
    return (
      <div>
        <Provider store={store(state)}>
          {() => <Router history={history} children={routes} {...router} />}
        </Provider>
      </div>
    );
  }
}
