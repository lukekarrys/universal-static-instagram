'use strict';

import fs from 'fs';
import async from 'async';
import path from 'path';
import sortBy from 'lodash/collection/sortBy';

const isJSON = (filename) => path.extname(filename) === '.json';
const sortByCreate = (obj) => Number(obj.created_time);
const readJSON = (file, cb) => {
  fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
    if (err) return cb(err);
    cb(null, JSON.parse(data));
  });
};

const readData = (dir, cb) => {
  fs.readdir(dir, (dirErr, files) => {
    if (dirErr) return cb(dirErr);

    async.map(
      files.filter(isJSON),
      (file, fileCb) => readJSON(path.join(dir, file), fileCb),
      (err, results) => {
        if (err) return cb(err);
        cb(null, sortBy(results, sortByCreate).reverse());
      }
    );
  });
};

export default readData;
