'use strict';

import babelRegister from 'babel/register'; // eslint-disable-line no-unused-vars
import config from 'hjs-webpack';
import each from 'lodash/collection/each';
import pick from 'lodash/object/pick';
import assign from 'lodash/object/assign';
import async from 'async';

import getData from './server/data';
import permalink from './src/helpers/permalink';
import render from './server/render';

const webpackConfig = config({
  in: 'src/main.js',
  out: '_site',
  clearBeforeBuild: true,
  html: (context, htmlDone) => {
    getData((dataErr, results) => {
      if (dataErr) { throw dataErr; }

      const {ids, tags, pages, dates} = results;
      const toData = (id) => pick(ids[id], ['created_time', 'images', 'id', 'caption']);
      const tagKeys = Object.keys(tags);
      const pageKeys = Object.keys(pages);

      const buildFiles = {};
      const buildFilesSync = {CNAME: 'jekyllgram.com'};

      const addTask = (filePath, data) => {
        const urlPath = filePath.slice(1).replace(/(\/)?(index)?\.html$/, '');

        if (urlPath) {
          buildFilesSync[`/json/${urlPath}.json`] = JSON.stringify(data);
        }

        buildFiles[filePath] = (cb) => render(context, urlPath, data, cb);
      };

      const addPhotosTask = (filePath, photos) => {
        addTask(filePath, {photos: photos.map(toData)});
      };

      // Home page has first page of photos
      addTask('/index.html', {photos: pages['1'].map(toData)});

      // Save tags html and json files
      buildFilesSync['/json/tags.json'] = JSON.stringify(tagKeys);
      addTask('/tags/index.html', {tags: tagKeys});
      each(tags, (photos, tag) => addPhotosTask(`/tags/${tag}.html`, photos));

      // Same for list of pages
      buildFilesSync['/json/pages.json'] = JSON.stringify(pageKeys);
      addTask('/pages/index.html', {pages: pageKeys});
      each(pages, (photos, page) => addPhotosTask(`/pages/${page}.html`, photos));

      // And individual photos and date pages
      each(dates, (photos, date) => addPhotosTask(`/photos/${date}/index.html`, photos));
      each(ids, (photo) => addTask(`${permalink(photo)}.html`, photo));

      // Run all the async taks and merge those paths with the non-async paths
      async.parallel(buildFiles, (htmlErr, paths) => {
        if (htmlErr) { throw htmlErr; }
        htmlDone(null, assign(paths, buildFilesSync));
      });
    });
  }
});

export default webpackConfig;
