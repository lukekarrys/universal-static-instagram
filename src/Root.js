'use strict';

import React, {Component} from 'react';
import {ReduxRouter} from 'redux-react-router';
import {Provider} from 'react-redux';

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    routes: React.PropTypes.element,
    children: React.PropTypes.element
  }

  render () {
    const {store, routes, children} = this.props;
    return (
      <div>
        <Provider store={store}>
          {() => <ReduxRouter>{routes}</ReduxRouter>}
        </Provider>
        {children}
      </div>
    );
  }
}
