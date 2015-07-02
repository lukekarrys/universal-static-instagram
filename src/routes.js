'use strict';

import React from 'react';
import {Route} from 'react-router';

import App from './components/App';
import PagesList from './components/pages/PagesList';
import TagsList from './components/pages/TagsList';
import PhotosByTag from './components/pages/PhotosByTag';
import PhotosByDate from './components/pages/PhotosByDate';
import PhotosByPage from './components/pages/PhotosByPage';
import Photo from './components/pages/Photo';
import NotFound from './components/NotFound';

const routes = (
  <Route component={App}>
    <Route path='/' component={PhotosByPage} />
    <Route path='pages' component={PagesList} />
    <Route path='pages/:page' component={PhotosByPage} />

    <Route path='tags' component={TagsList} />
    <Route path='tags/:tag' component={PhotosByTag} />

    <Route path='photos/:year' component={PhotosByDate} />
    <Route path='photos/:year/:month' component={PhotosByDate} />
    <Route path='photos/:year/:month/:day' component={PhotosByDate} />
    <Route path='photos/:year/:month/:day/:id' component={Photo} />

    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
