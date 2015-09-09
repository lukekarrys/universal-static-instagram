'use strict';

import download from 'instagram-download';
import getConfig from '../config/get';
import dir from './cacheDir';

download({dir, ...getConfig()}, (err) => process.stdout.write(err || 'Success!'));
