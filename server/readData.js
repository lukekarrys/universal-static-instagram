'use strict';

import fs from 'fs';
import async from 'async';
import path from 'path';
import sortBy from 'lodash/collection/sortBy';

const CACHE_DIR = path.resolve(__dirname, '..', '_cache');

const isJSON = (filename) => path.extname(filename) === '.json';
const sortByCreate = (obj) => Number(obj.created_time);
const readJSON = (file, cb) => {
  fs.readFile(path.resolve(CACHE_DIR, file), {encoding: 'utf8'}, (err, data) => {
    if (err) {
      return cb(err);
    }
    cb(null, JSON.parse(data));
  });
};

const readData = (cb) => {
  fs.readdir(CACHE_DIR, (dirErr, files) => {
    if (dirErr) {
      return cb(dirErr);
    }

    const jsonFiles = files.filter(isJSON);

    async.map(jsonFiles, readJSON, (err, results) => {
      if (err) {
        return cb(err);
      }
      cb(null, sortBy(results, sortByCreate).reverse());
    });
  });
};

export default readData;
