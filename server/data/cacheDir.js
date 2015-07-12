'use strict';

import path from 'path';
import getConfig from '../config/get';

const CONFIG = getConfig();
const CACHE_DIR = '_cache';
const JSON_DIR = 'json';
const MEDIA_DIR = 'media';

class CacheDir {
  constructor () {
    const {user} = CONFIG;
    if (!user) {
      throw new Error('A user id is required. Run `npm run make.config` to get started.');
    }
    this._base = path.resolve(__dirname, '..', '..', CACHE_DIR, user);
  }

  json (...parts) {
    return path.join.apply(path, [this._base, JSON_DIR].concat(parts));
  }

  media (...parts) {
    return path.join.apply(path, [this._base, MEDIA_DIR].concat(parts));
  }
}

export default CacheDir;

