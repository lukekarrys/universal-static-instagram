'use strict';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {minify} from 'html-tagged-literals';
import debugThe from 'debug';
import {Provider as RebassProvider} from 'rebass';
import {ServerStyleSheet} from 'styled-components';
import slash from '../src/helpers/slash';
import pathToKey from '../src/helpers/pathToKey';
import normalize from '../src/helpers/normalize';
import * as ACTIONS from '../src/actions';
import createStore from '../src/store';
import Routes from '../src/routes';

const noJS = process.env.USI_NOJS === 'true';
const debug = debugThe('usi:render');
const debugPages = debugThe('usi:pages');

const successActions = {
  photo: ACTIONS.PHOTO_SUCCESS,
  photos: ACTIONS.PHOTOS_SUCCESS,
  tags: ACTIONS.TAGS_SUCCESS,
  pages: ACTIONS.PAGES_SUCCESS
};

const template = ({context, body, state, styles}) => minify`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
      <meta name="apple-mobile-web-app-capable" content="yes">
      ${context.css ? `<link rel="stylesheet" href="/${context.css}">` : ''}
      ${styles || ''}
    </head>
    <body><div id='container'>${body || ''}</div></body>
    ${noJS ? '' : `<script>__INITIAL_STATE__=${JSON.stringify(state || {})}</script>`}
    ${noJS ? '' : `<script src="/${context.main}"></script>`}
  </html>
`;

export default ({context, path, data = null, key = null}, done) => {
  // setImmediate hack to clear call stack to prevent max size exceeded
  const doneWithTemplate = ({body, state, styles} = {}) =>
    setImmediate(() => done(null, template({context, styles, body, state})));

  // During dev this is called with only a context to just return an empty template
  if (path === undefined) return doneWithTemplate();

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

  const sheet = new ServerStyleSheet();

  const body = (noJS ? renderToStaticMarkup : renderToString)(sheet.collectStyles(
    <RebassProvider>
      <Provider store={store}>
        <StaticRouter location={location}>
          <Routes />
        </StaticRouter>
      </Provider>
    </RebassProvider>
  ));

  const styles = sheet.getStyleTags();
  const state = store.getState();

  debugPages(`body: ${body}`);
  debugPages(`state: ${JSON.stringify(state)}`);

  return doneWithTemplate({body, state, styles});
};
