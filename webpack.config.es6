'use strict';

import babelRegister from 'babel/register'; // eslint-disable-line no-unused-vars
import React from 'react';
import config from 'hjs-webpack';
import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import partial from 'lodash/function/partial';
import each from 'lodash/collection/each';
import pick from 'lodash/object/pick';
import assign from 'lodash/object/assign';
import async from 'async';
import getData from './data';
import routes from './src/routes';
import permalink from './src/helpers/permalink';

const buildFiles = {
  CNAME: 'jekyllgram.com'
};

const idToData = (byIds, attrs, id) => pick(byIds[id], attrs);

const scripts = (context, data) => {
  return `
    <script>__INITIAL_DATA__ = ${JSON.stringify(data)};</script>
    <script src="/${context.main}"></script>
  `;
};

const template = (context, body, data, dynamic) => {

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes">
      </head>
      <body>
        <div id="app">${body}</div>
        ${dynamic ? scripts(context, data) : ''}
      </body>
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
      const tagKeys = Object.keys(tags);
      const pageKeys = Object.keys(pages);
      const firstPage = pages['1'].map(toData);

      const tasks = {};

      const addTask = (filePath, data) => {
        const urlPath = filePath.slice(1).replace(/(\/)?(index)?\.html$/, '');
        tasks[filePath] = (cb) => html(context, urlPath, data, cb);
      };

      const addPhotosTask = (filePath, photos) => {
        addTask(filePath, {photos: photos.map(toData)});
      };

      addTask('/index.html', {photos: firstPage});
      addTask('/tags/index.html', {tags: tagKeys});
      addTask('/pages/index.html', {pages: pageKeys});

      each(tags, (photos, tag) => addPhotosTask(`/tags/${tag}.html`, photos));
      each(pages, (photos, page) => addPhotosTask(`/pages/${page}.html`, photos));
      each(dates, (photos, date) => addPhotosTask(`/photos/${date}/index.html`, photos));
      each(ids, (photo) => addTask(`${permalink(photo)}.html`, photo));

      async.parallel(tasks, (htmlErr, paths) => {
        if (htmlErr) { throw htmlErr; }
        htmlDone(null, assign(paths, buildFiles));
      });
    });
  }
});

export default webpackConfig;
