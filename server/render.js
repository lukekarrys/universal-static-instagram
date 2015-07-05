'use strict';

import React from 'react';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import Iso from 'iso';
import createElement from '../src/createAltContainer';
import alt from '../src/alt';
import routes from '../src/routes';
import slash from '../src/helpers/slash';

const template = (context, body) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
      </head>
      <body>${body}</body>
      <script src="/${context.main}"></script>
    </html>
  `.replace(/\n\s*/g, '');
};

const render = (context, path, data, done) => {
  const iso = new Iso();
  const location = new Location(slash(path));

  // We only have a single store in our app so all data goes there
  alt.bootstrap(JSON.stringify({AppStore: data || {}}));

  Router.run(routes, location, (err, initialState) => {
    if (err) return done(err);

    const content = React.renderToString(<Router {...initialState} createElement={createElement} />);
    iso.add(content, alt.flush());

    done(null, template(context, iso.render()));
  });
};

export default render;
