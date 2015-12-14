'use strict';

import path from 'path';

const {USI_CACHE_DIR} = process.env;

export default path.resolve(__dirname, '..', '..', USI_CACHE_DIR || '_cache');
