'use strict';

import React from 'react';
import {renderToString} from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import {match} from 'redux-router/server';
import slash from '../src/helpers/slash';
import pathToKey from '../src/helpers/pathToKey';
import normalize from '../src/helpers/normalize';
import * as ACTIONS from '../src/actions';
import Root from '../src/Root';
import createStore from '../src/store';
import routes from '../src/routes';
import debugThe from 'debug';

const debug = debugThe('usi:render');
const finalCreateStore = createStore({router: {routes}});
const successActions = {
  photo: ACTIONS.PHOTO_SUCCESS,
  photos: ACTIONS.PHOTOS_SUCCESS,
  tags: ACTIONS.TAGS_SUCCESS,
  pages: ACTIONS.PAGES_SUCCESS
};

const template = ({context, body, state}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        ${context.css ? `<link rel="stylesheet" href="/${context.css}">` : ''}
      </head>
      <body><div id='container'>${body || ''}</div></body>
      <script>__INITIAL_STATE__=${JSON.stringify(state || {})}</script>
      <script src="/${context.main}"></script>
    </html>
  `.replace(/\n\s*/g, '');
};

export default ({context, path, data = null, key = null}, done) => {
  // During dev this is called with only a context to just return an empty template
  if (path === undefined && !done) return template({context});

  const location = createLocation(slash(path));
  const actionType = successActions[key];
  const pathKey = key === null ? null : pathToKey(location.pathname);

  debug(`Router run ${location.pathname}`);
  debug(`Action type ${actionType}`);
  debug(`Path key ${pathKey}`);
  debug(`Has data ${!!data}`);

  const store = finalCreateStore();

  // Dispatch action with initial data if we have one
  if (actionType) {
    store.dispatch({
      type: actionType,
      key: pathKey,
      ...normalize({json: data, key})
    });
  }

  // Use redux-router to match location and dispatch that to the store
  // and then get the page rendered to a string
  store.dispatch(match(location.pathname, (err) => {
    if (err) {
      debug(`Store dispatch matching location err ${err}`);
      return done(err);
    }

    done(null, template({
      context,
      state: store.getState(),
      body: renderToString(<Root store={store} />)
    }));
  }));
};
