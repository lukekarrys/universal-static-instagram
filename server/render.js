'use strict';

import {minify} from 'html-tagged-literals';
import debugThe from 'debug';
import slash from '../src/helpers/slash';
import pathToKey from '../src/helpers/pathToKey';
import normalize from '../src/helpers/normalize';
import * as ACTIONS from '../src/actions';
import render from '../src/server';

const noJS = process.env.USI_NOJS === 'true';
const debug = debugThe('usi:render');
const debugPages = debugThe('usi:pages');

const successActions = {
  photo: ACTIONS.PHOTO_SUCCESS,
  photos: ACTIONS.PHOTOS_SUCCESS,
  tags: ACTIONS.TAGS_SUCCESS,
  pages: ACTIONS.PAGES_SUCCESS
};

const template = ({context, html, state, styles}) => minify`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
      <meta name="apple-mobile-web-app-capable" content="yes">
      ${context.css ? `<link rel="stylesheet" href="/${context.css}">` : ''}
      ${styles || ''}
    </head>
    <body><div id='container'>${html || ''}</div></body>
    ${noJS ? '' : `<script>__INITIAL_STATE__=${JSON.stringify(state || {})}</script>`}
    ${noJS ? '' : `<script src="/${context.main}"></script>`}
  </html>
`;

export default ({context, path, data = null, key = null}, done) => {
  // setImmediate hack to clear call stack to prevent max size exceeded
  const doneWithTemplate = (options = {}) => setImmediate(() => done(null, template({context, ...options})));

  // During dev this is called with only a context so just return an empty template
  if (path === undefined) return doneWithTemplate();

  const location = slash(path) || '/';
  const actionType = successActions[key];
  const pathKey = key === null ? null : pathToKey(location);
  const action = actionType && {
    type: actionType,
    key: pathKey,
    ...normalize({json: data, key})
  };

  debug(`Path ${path}`);
  debug(`Router run ${location}`);
  debug(`Action type ${actionType}`);
  debug(`Path key ${pathKey}`);
  debug(`Has action ${!!action}`);
  debug(`Has data ${!!data}`);
  debug('-----------------------');

  const {state, styles, html} = render({action, location, noJS});

  debugPages(`html: ${html}`);
  debugPages(`state: ${JSON.stringify(state)}`);

  return doneWithTemplate({html, state, styles});
};
