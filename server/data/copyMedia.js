'use strict';

import cpr from 'cpr';
import path from 'path';
import noop from 'lodash/utility/noop';
import CacheDir from './cacheDir';

const copyMedia = (cb) => cpr(
  new CacheDir().media(),
  path.resolve(__dirname, '..', '..', 'public', 'media'),
  {
    deleteFirst: false,
    overwrite: false
  },
  typeof cb === 'function' ? cb : noop
);

export default copyMedia;
