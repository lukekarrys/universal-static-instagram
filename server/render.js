'use strict';

import React from 'react';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import Root from '../src/Root';
import routes from '../src/routes';
import slash from '../src/helpers/slash';
import pathToKey from '../src/helpers/pathToKey';
import normalize from '../src/helpers/normalize';
import reducer from '../src/reducers';
import store from '../src/store';
import * as ACTIONS from '../src/actions';
import debugThe from 'debug';

const successActions = {
  photo: ACTIONS.PHOTO_SUCCESS,
  photos: ACTIONS.PHOTOS_SUCCESS,
  tags: ACTIONS.TAGS_SUCCESS,
  pages: ACTIONS.PAGES_SUCCESS
};

const debug = debugThe('usi:render');

const template = ({context, body, state}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
      </head>
      <body>${body || ''}</body>
      ${state ? `<script>__INITIAL_STATE__=${JSON.stringify(state)}</script>` : ''}
      ${context ? `<script src="/${context.main}"></script>` : ''}
    </html>
  `.replace(/\n\s*/g, '');
};

const render = ({context, path, data, key}, done) => {
  // This can be called with only a context to just return an empty template
  // for dev purposes
  if (path === undefined) return template({context});

  const location = new Location(slash(path));
  Router.run(routes, location, (err, props) => {
    if (err) return done(err);

    debug(`Router run ${location.pathname}`);

    // Use the raw reducer to make the initial data in the correct shape
    // expected by the redux on the client
    const state = data && key ? reducer(undefined, {
      type: successActions[key],
      key: pathToKey(location.pathname),
      ...normalize({json: data, key})
    }) : {};

    // If we wanted to we could make this a completely static site with no JS
    // by using renderToStaticMarkup and not including any <script> tags
    done(null, template({
      context,
      state,
      body: React.renderToString(<Root router={props} store={store(state)} />)
    }));
  });
};

export default render;
