'use strict';

import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Provider as RebassProvider} from 'rebass';
import {ServerStyleSheet} from 'styled-components';
import createStore from './store';
import Routes from './routes';
import injectStyles from './styles';

export default ({action, location, noJS}) => {
  const store = createStore();
  const sheet = new ServerStyleSheet();
  const render = noJS ? renderToStaticMarkup : renderToString;

  if (action) store.dispatch(action);

  injectStyles();

  const serverApp = (
    <RebassProvider>
      <Provider store={store}>
        <StaticRouter location={location}>
          <Routes />
        </StaticRouter>
      </Provider>
    </RebassProvider>
  );

  return {
    html: render(sheet.collectStyles(serverApp)),
    state: store.getState(),
    styles: sheet.getStyleTags()
  };
};
