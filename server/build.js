'use strict';

import each from 'lodash/collection/each';
import assign from 'lodash/object/assign';
import async from 'async';
import debugThe from 'debug';
import organizeData from './data/organize';
import renderApp from './render';
import getConfig from './config/get';

const debug = debugThe('usi:build');
const CONFIG = getConfig();
const toPhotosList = (obj) => {
  obj.photos = obj.photos.map((photo) => ({
    createdTime: photo.createdTime,
    images: photo.images,
    id: photo.id,
    caption: photo.caption,
    likes: {count: photo.likes.count || 0},
    comments: {count: photo.likes.comments || 0}
  }));
  return obj;
};

const buildStatic = (context, done) => organizeData((dataErr, results) => {
  if (dataErr) throw dataErr;

  const isBuild = !context.isDev;
  const {ids, tags, tagKeys, pages, pageKeys, dates} = results;
  const render = ({path, data, key}) => (cb) => renderApp({context, path, data, key}, cb);

  const filesAsync = {};
  const filesSync = {};

  if (isBuild) {
    // Create a 404.html file for our deployment targets in build mode
    filesAsync['404.html'] = render({path: '__NOT_A_REAL_URL__'});
    // Create the CNAME file based on the config domain
    if (CONFIG.domain) {
      debug(`Domain: ${CONFIG.domain}`);
      filesSync.CNAME = CONFIG.domain;
    }
  }
  else {
    // In dev mode we only need one (mostly empty) html file
    filesSync['index.html'] = renderApp({context});
  }

  const addTask = (filePath, data, key) => {
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

    if (isBuild) {
      // Add a task to async render this html file (uses react-router)
      debug(`File: ${filePath}`);
      debug(`URL Path: ${urlPath}`);
      filesAsync[filePath] = render({path: urlPath, data, key});
    }
  };

  // Home page has first page of photos
  addTask('/index.html', toPhotosList(pages['1']), 'photos');

  // Save tags html and json files
  addTask('/tags/index.html', {tags: tagKeys}, 'tags');
  each(tags, (obj) => addTask(`/tags/${obj.id}.html`, toPhotosList(obj), 'photos'));

  // Same for list of pages
  addTask('/pages/index.html', {pages: pageKeys}, 'pages');
  each(pages, (obj) => addTask(`/pages/${obj.id}.html`, toPhotosList(obj), 'photos'));

  // And individual photos and date pages
  each(ids, (obj) => addTask(`/photos/${obj.id}.html`, obj, 'photo'));
  each(dates, (obj) => addTask(`/photos/${obj.id}/index.html`, toPhotosList(obj), 'photos'));

  // Run all the async taks and merge those paths with the non-async paths
  async.parallel(filesAsync, (htmlErr, paths) => {
    if (htmlErr) throw htmlErr;
    done(null, assign(paths, filesSync));
  });
});

export default buildStatic;
