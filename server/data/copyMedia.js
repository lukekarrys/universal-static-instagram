'use strict';

import cpr from 'cpr';
import path from 'path';
import noop from 'lodash/utility/noop';
import getConfig from '../config/get';
import cacheDir from './cacheDir';
import {buildDir} from '../build';

export default (cb) => cpr(
  path.join(cacheDir, getConfig().user, 'media'),
  path.join(buildDir, 'media'),
  {
    deleteFirst: false,
    overwrite: false
  },
  typeof cb === 'function' ? cb : noop
);
