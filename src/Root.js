'use strict';

import React, {Component} from 'react';
import {ReduxRouter} from 'redux-react-router';
import {Provider} from 'react-redux';

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    routes: React.PropTypes.object,
    children: React.PropTypes.element
  }

  render () {
    return (
      <div>
        <Provider store={this.props.store}>
          {() => <ReduxRouter routes={this.props.routes} />}
        </Provider>
        {this.props.children}
      </div>
    );
  }
}
