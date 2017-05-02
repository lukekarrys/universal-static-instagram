'use strict';

import path from 'path';
import fs from 'fs';
import {attempt, isError} from 'lodash';

const {USI_CONFIG} = process.env;
const configPath = path.resolve(__dirname, '..', '..', USI_CONFIG || 'config.json');
const config = attempt(() => JSON.parse(fs.readFileSync(configPath)));

export default () => (isError(config)) ? {} : config;
