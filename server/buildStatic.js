'use strict';

import each from 'lodash/collection/each';
import pick from 'lodash/object/pick';
import assign from 'lodash/object/assign';
import async from 'async';
import debugThe from 'debug';
import organizeData from './organizeData';
import renderApp from './render';
import permalink from '../src/helpers/permalink';
import getConfig from './getConfig';

const debug = debugThe('usi:build');
const CONFIG = getConfig();
const LIST_PROPS = ['created_time', 'images', 'id', 'caption'];

const buildStatic = (context, done) => organizeData((dataErr, results) => {
  if (dataErr) throw dataErr;

  const {ids, tags, tagKeys, pages, pageKeys, dates} = results;
  const toPhotos = (photos) => ({photos: photos.map(id => pick(ids[id], LIST_PROPS))});
  const render = (urlPath, data) => (cb) => renderApp(context, urlPath, data, cb);

  const filesAsync = {'404.html': render('__NOT_A_REAL_URL__')};
  const filesSync = {};

  // Create the CNAME file based on the config domain
  if (CONFIG.domain) {
    debug(`Domain: ${CONFIG.domain}`);
    filesSync.CNAME = CONFIG.domain;
  }

  const addTask = (filePath, data) => {
    // Strip leading / and trailing /index.html or .html from the filepath
    // since that is what will be served by the app
    const urlPath = filePath.slice(1).replace(/(\/)?(index)?\.html$/, '');
    const jsonPath = `/json/${urlPath}.json`;

    if (urlPath) {
      // If we have a url path then also save the data as a plain json
      // file. This is our "API" :)
      debug(`JSON: ${jsonPath}`);
      filesSync[jsonPath] = JSON.stringify(data);
    }

    // Add a task to async render this html file (uses react-router)
    debug(`File: ${filePath}`);
    filesAsync[filePath] = render(urlPath, data);
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
  async.parallel(filesAsync, (htmlErr, paths) => {
    if (htmlErr) throw htmlErr;
    done(null, assign(paths, filesSync));
  });
});

export default buildStatic;
