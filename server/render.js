'use strict';

import React from 'react';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import Iso from 'iso';
import transform from 'lodash/object/transform';
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

// {photos: [], tags: []}
// ----->
// {
//   PhotosStore: {photos: [], loading: false, error: null},
//   TagsStore: {tags: [], loading: false, error: null}
// }
const dataToStore = (data) => transform(data, (res, value, key) => {
  res[`${key.slice(0, 1).toUpperCase()}${key.slice(1)}Store`] = {
    [key]: value,
    loading: false,
    error: null
  };
}, {});

const renderEmpty = (context) => {
  const iso = new Iso();
  iso.add('', JSON.stringify({}));
  return template(context, iso.render());
};

const render = (context, path, data, done) => {
  const iso = new Iso();
  const location = new Location(slash(path));

  Router.run(routes, location, (err, props) => {
    if (err) return done(err);

    alt.bootstrap(JSON.stringify(dataToStore(data)));

    iso.add(
      React.renderToString(<Router {...props} createElement={createElement} />),
      alt.flush()
    );

    done(null, template(context, iso.render()));
  });
};

export {renderEmpty as renderEmpty};
export default render;
