'use strict';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import {Provider} from 'react-redux';
import {minify} from 'html-tagged-literals';
import debugThe from 'debug';
import slash from '../src/helpers/slash';
import pathToKey from '../src/helpers/pathToKey';
import normalize from '../src/helpers/normalize';
import * as ACTIONS from '../src/actions';
import createStore from '../src/store';
import routes from '../src/routes';

const noJS = process.env.USI_NOJS === 'true';
const debug = debugThe('usi:render');
const successActions = {
  photo: ACTIONS.PHOTO_SUCCESS,
  photos: ACTIONS.PHOTOS_SUCCESS,
  tags: ACTIONS.TAGS_SUCCESS,
  pages: ACTIONS.PAGES_SUCCESS
};

const template = ({context, body, state}) => minify`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
      <meta name="apple-mobile-web-app-capable" content="yes">
      ${context.css ? `<link rel="stylesheet" href="/${context.css}">` : ''}
    </head>
    <body><div id='container'>${body || ''}</div></body>
    ${noJS ? '' : `<script>__INITIAL_STATE__=${JSON.stringify(state || {})}</script>`}
    ${noJS ? '' : `<script src="/${context.main}"></script>`}
  </html>
`;

export default ({context, path, data = null, key = null}, done) => {
  // During dev this is called with only a context to just return an empty template
  if (path === undefined && !done) {
    template({context});
    return;
  }

  const location = slash(path) || '/';
  const actionType = successActions[key];
  const pathKey = key === null ? null : pathToKey(location);

  debug(`Path ${path}`);
  debug(`Router run ${location}`);
  debug(`Action type ${actionType}`);
  debug(`Path key ${pathKey}`);
  debug(`Has data ${!!data}`);
  debug('-----------------------');

  const store = createStore();

  // Dispatch action with initial data if we have one
  if (actionType) {
    store.dispatch({
      type: actionType,
      key: pathKey,
      ...normalize({json: data, key})
    });
  }

  match({routes, location}, (err, __, renderProps) => {
    if (err) {
      debug(`Store dispatch matching location err ${err}`);
      done(err);
      return;
    }

    const body = (noJS ? renderToStaticMarkup : renderToString)(
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );

    debug(`body: ${body}`);

    // Hack to clear call stack to prevent max size exceeded
    setImmediate(() => done(null, template({
      context,
      body,
      state: store.getState()
    })));
  });
};
