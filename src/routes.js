import React from 'react';
import {Route} from 'react-router';

import App from './components/App';
import PagesList from './components/PagesList';
import TagsList from './components/TagsList';
import PhotosByTag from './components/PhotosByTag';
import PhotosByDate from './components/PhotosByDate';
import PhotosByPage from './components/PhotosByPage';
import Photo from './components/Photo';
import NotFound from './components/NotFound';

const routes = (
  <Route path='/' component={App}>
    <Route path='tags' component={TagsList} />
    <Route path='tags/:tag' component={PhotosByTag} />

    <Route path='pages' component={PagesList} />
    <Route path='pages/:page' component={PhotosByPage} />

    <Route path='photos/:year' component={PhotosByDate} />
    <Route path='photos/:year/:month' component={PhotosByDate} />
    <Route path='photos/:year/:month/:day' component={PhotosByDate} />
    <Route path='photos/:year/:month/:day/:id' component={Photo} />

    <Route path='*' component={NotFound} />
  </Route>
);

export default routes;
