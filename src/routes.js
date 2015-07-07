'use strict';

import React from 'react';
import {Route} from 'react-router';

import App from './components/App';
import Pages from './pages/Pages';
import Tags from './pages/Tags';
import Photos from './pages/Photos';
import Photo from './pages/Photo';
import NotFound from './components/NotFound';

const routes = (
  <Route component={App}>
    <Route path='/' component={Photos} />
    <Route path='pages' component={Pages} />
    <Route path='pages/:page' component={Photos} />

    <Route path='tags' component={Tags} />
    <Route path='tags/:tag' component={Photos} />

    <Route path='photos/:year' component={Photos} />
    <Route path='photos/:year/:month' component={Photos} />
    <Route path='photos/:year/:month/:day' component={Photos} />
    <Route path='photos/:year/:month/:day/:id' component={Photo} />

    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
