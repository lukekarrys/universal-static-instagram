'use strict';

import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './components/App';
import Pages from './containers/Pages';
import Tags from './containers/Tags';
import Photos from './containers/Photos';
import Photo from './containers/Photo';
import NotFound from './components/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path='/' component={Photos} />

          <Route exact path='/pages' component={Pages} />
          <Route exact path='/pages/:page' component={Photos} />

          <Route exact path='/tags' component={Tags} />
          <Route exact path='/tags/:tag' component={Photos} />

          <Route exact path='/photos/:year' component={Photos} />
          <Route exact path='/photos/:year/:month' component={Photos} />
          <Route exact path='/photos/:year/:month/:day' component={Photos} />
          <Route exact path='/photos/:year/:month/:day/:id' component={Photo} />

          <Route component={NotFound} />
        </Switch>
      </App>
    );
  }
}
