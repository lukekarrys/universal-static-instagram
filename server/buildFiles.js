'use strict';

import each from 'lodash/collection/each';
import pick from 'lodash/object/pick';
import assign from 'lodash/object/assign';
import async from 'async';
import path from 'path';

import buildData from './buildData';
import renderApp from './render';
import permalink from '../src/helpers/permalink';

const LIST_PROPS = ['created_time', 'images', 'id', 'caption'];
const DATA_DIR = path.resolve(__dirname, '..', '_cache', 'json');

const buildFiles = (context, done) => buildData(DATA_DIR, (dataErr, results) => {
  if (dataErr) throw dataErr;

  const {ids, tags, tagKeys, pages, pageKeys, dates} = results;
  const toPhotos = (photos) => ({photos: photos.map(id => pick(ids[id], LIST_PROPS))});
  const render = (urlPath, data) => (cb) => renderApp(context, urlPath, data, cb);

  const buildFilesAsync = {'404.html': render('__NOT_A_REAL_URL__')};
  const buildFilesSync = {CNAME: 'jekyllgram.com'};

  const addTask = (filePath, data) => {
    // Strip leading / and trailing /index.html or .html from the filepath
    // since that is what will be served by the app
    const urlPath = filePath.slice(1).replace(/(\/)?(index)?\.html$/, '');

    if (urlPath) {
      // If we have a url path then also save the data as a plain json
      // file. This is our "API" :)
      buildFilesSync[`/json/${urlPath}.json`] = JSON.stringify(data);
    }

    // Add a task to async render this html file (uses react-router)
    buildFilesAsync[filePath] = render(urlPath, data);
  };

  // Home page has first page of photos
  addTask('/index.html', toPhotos(pages['1']));

  // Save tags html and json files
  addTask('/tags/index.html', {tags: tagKeys});
  each(tags, (photos, tag) => addTask(`/tags/${tag}.html`, toPhotos(photos)));

  // Same for list of pages
  addTask('/pages/index.html', {pages: pageKeys});
  each(pages, (photos, page) => addTask(`/pages/${page}.html`, toPhotos(photos)));

  // And individual photos and date pages
  each(ids, (photo) => addTask(`${permalink(photo)}.html`, {photo}));
  each(dates, (photos, date) => addTask(`/photos/${date}/index.html`, toPhotos(photos)));

  // Run all the async taks and merge those paths with the non-async paths
  async.parallel(buildFilesAsync, (htmlErr, paths) => {
    if (htmlErr) throw htmlErr;
    done(null, assign(paths, buildFilesSync));
  });
});

export default buildFiles;
