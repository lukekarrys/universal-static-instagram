'use strict';

import cpr from 'cpr';
import path from 'path';
import noop from 'lodash/utility/noop';
import getConfig from '../config/get';
import cacheDir from './cacheDir';

const copyMedia = (cb) => cpr(
  path.join(cacheDir, getConfig().user, 'media'),
  path.resolve(__dirname, '..', '..', 'public', 'media'),
  {
    deleteFirst: false,
    overwrite: false
  },
  typeof cb === 'function' ? cb : noop
);

export default copyMedia;
