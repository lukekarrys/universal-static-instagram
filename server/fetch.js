'use strict';

import minimist from 'minimist';
import {instagram} from 'instagram-node';
import {queue, series, parallel} from 'async';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import request from 'request';
import each from 'lodash/collection/each';
import debugThe from 'debug';
import readData from './readData';

const debug = debugThe('ig');
const MAX_COUNT = 33;
const JSON_DIRNAME = 'json';
const MEDIA_DIRNAME = 'media';
const QUEUE_CONCURRENCY = 10;
const encoding = 'utf8';


// --------------------
// CLI OPTIONS
// --------------------

// Get all the options from the CLI
const {
  client: OPT_CLIENT,
  secret: OPT_SECRET,
  user: OPT_USER,
  dir: OPT_DIR,
  refresh: OPT_REFRESH,
  full: OPT_FULL
} = minimist(process.argv.slice(2), {
  boolean: ['refresh', 'full'],
  string: ['client', 'secret', 'user'],
  default: {dir: '_cache'}
});

// These are all the necessary options
if (!OPT_CLIENT || !OPT_SECRET || !OPT_USER || !OPT_DIR) {
  throw new Error('client, secret, user, and dir are requried');
}

// Log all the things to start so we know whats going on
debug('CLIENT', OPT_CLIENT);
debug('SECRET', OPT_SECRET);
debug('USER ID', OPT_USER);
debug('DIR', OPT_DIR);
debug('REFRESH', !!OPT_REFRESH);
debug('FULL', !!OPT_FULL);

// Configure our instagram API instance
const ig = instagram();
ig.use({client_id: OPT_CLIENT, client_secret: OPT_SECRET});


// --------------------
// HELPERS
// --------------------

// Helper to get dirs instead of user specified directory
const getDir = (...parts) => {
  return path.join.apply(path, [path.resolve(__dirname, '..', OPT_DIR)].concat(parts));
};
const debugPath = (filepath) => filepath.replace(path.resolve(__dirname, '..'), '');

// Helper for deciding whether to write a file
const shouldWrite = (filepath, overwrite, yes, no) => {
  fs.exists(filepath, (exists) => {
    if (exists && !overwrite) {
      debug('Exists, skipping', debugPath(filepath));
      no();
    }
    else if (exists && overwrite) {
      debug('Exists, overwriting', debugPath(filepath));
      yes();
    }
    else {
      debug('Does not exist, writing', debugPath(filepath));
      yes();
    }
  });
};


// --------------------
// SAVING JSON & IMAGES
// --------------------

// Queue to save json to id.json in directory
const saveJson = queue((json, saveDone) => {
  const id = json.id;
  const filepath = getDir(JSON_DIRNAME, id + '.json');
  const writeFile = (data) => fs.writeFile(filepath, JSON.stringify(data), {encoding}, saveDone);
  shouldWrite(filepath, OPT_REFRESH, () => {
    if (OPT_FULL) {
      // Full means we fetch likes and comments separately and add those
      // to the json payload that gets saved
      parallel({
        likes: (cb) => ig.likes(id, cb),
        comments: (cb) => ig.comments(id, cb)
      }, (err, res) => {
        if (err) return saveDone(err);
        json.likes.data = res.likes;
        json.comments.data = res.comments;
        writeFile(json);
      });
    }
    else {
      writeFile(json);
    }
  }, saveDone);
}, QUEUE_CONCURRENCY);

// Queue to download and save image to directory
const saveImage = queue((url, cb) => {
  // The Instagram images get saved to a location on disk that matches the
  // urls domain+path, so we need to make that directory and then save the file
  const stripped = url.replace(/^https?:\/\//, '/');
  const dirname = getDir(MEDIA_DIRNAME, path.dirname(stripped));
  const filepath = path.join(dirname, path.basename(stripped));
  // An Instagram image at a url should never change so we shouldn't ever
  // need to download it more than once
  shouldWrite(filepath, false, () => {
    mkdirp(dirname, (err) => {
      if (err) return cb(err);
      request(url).pipe(fs.createWriteStream(filepath)).on('close', cb);
    });
  }, cb);
}, QUEUE_CONCURRENCY);


// --------------------
// INSTAGRAM
// --------------------

// Handler to paginate through the recent user media
let COUNT = 0;
const fetchMedia = (err, medias, pagination, remaining) => {
  if (err) throw err;

  COUNT += medias.length;
  debug('Fetched media', medias.length, COUNT);
  debug('API calls left', remaining);

  medias.forEach((media) => {
    saveJson.push(media);
    each(media.images, (img) => saveImage.push(img.url));
  });

  if (pagination.next) pagination.next(fetchMedia);
};

// Make sure all our directories are created and
// then start the instagram fetching
series({
  json: (cb) => mkdirp(getDir(JSON_DIRNAME), cb),
  media: (cb) => mkdirp(getDir(MEDIA_DIRNAME), cb),
  data: (cb) => readData(getDir(JSON_DIRNAME), cb)
}, (err, results) => {
  if (err) throw err;

  const options = {count: MAX_COUNT};
  const {data} = results;
  const [first] = data;

  // This is our most recent instagram photo so we use it as a min_id
  // to only fetch photos newer than this
  if (first && first.id && !OPT_REFRESH) {
    options.min_id = first.id;
    debug('Start from', first.id, new Date(Number(first.created_time) * 1000).toJSON());
  }

  // The important part
  ig.user_media_recent(OPT_USER, options, fetchMedia);
});
