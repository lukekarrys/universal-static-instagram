'use strict';

import babelRegister from 'babel/register'; // eslint-disable-line no-unused-vars
import React from 'react';
import config from 'hjs-webpack';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import partial from 'lodash/function/partial';
import each from 'lodash/collection/each';
import pick from 'lodash/object/pick';
import async from 'async';
import getData from './data';
import routes from './src/routes';
import permalink from './src/helpers/permalink';

const idToData = (byIds, attrs, id) => {
  const datum = byIds[id];
  return attrs ? pick(datum, attrs) : datum;
};

const template = (context, body, data) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
      </head>
      <body><div id="app">${body}</div></body>
      <script>__INITIAL_DATA__ = ${JSON.stringify(data)};</script>
      <script src="/${context.main}"></script>
    </html>
  `.replace(/\n\s*/g, '');
};

const createElement = (data) => (Component, props) => <Component {...props} {...data} />;

const html = (context, path, data, done) => {
  const location = new Location('/' + path);
  Router.run(routes, location, (err, initialState) => {
    if (err) { return done(err); }
    const body = React.renderToString(<Router {...initialState} createElement={createElement(data)} />);
    done(null, template(context, body, data));
  });
};

const webpackConfig = config({
  in: 'src/main.js',
  out: '_site',
  clearBeforeBuild: true,
  html: (context, htmlDone) => {
    getData((dataErr, results) => {
      if (dataErr) { throw dataErr; }

      const {ids, tags, pages, dates} = results;
      const toData = partial(idToData, ids, ['created_time', 'images', 'id', 'caption']);

      const tasks = {};

      const addTask = (path, data) => {
        const filePath = (path.slice(1) || 'index') + '.html';
        tasks[filePath] = (cb) => html(context, path, data, cb);
      };

      const addPhotosTask = (filePath, photos) => {
        addTask(filePath, {photos: photos.map(toData)});
      };

      addTask('/', {photos: pages['1'].map(toData)});
      addTask('/tags', {tags: Object.keys(tags)});
      addTask('/pages', {pages: Object.keys(pages)});

      each(tags, (photos, tag) => addPhotosTask(`/tags/${tag}`, photos));
      each(pages, (photos, page) => addPhotosTask(`/pages/${page}`, photos));
      each(dates, (photos, date) => addPhotosTask(`/photos/${date}`, photos));
      each(ids, (photo) => addTask(permalink(photo), photo));

      async.parallel(tasks, (htmlErr, paths) => {
        if (htmlErr) { throw htmlErr; }
        paths.CNAME = 'jekyllgram.com';
        htmlDone(null, paths);
      });
    });
  }
});

export default webpackConfig;
