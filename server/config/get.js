'use strict';

import path from 'path';
import fs from 'fs';

const {USI_CONFIG} = process.env;
const configPath = path.resolve(__dirname, '..', '..', USI_CONFIG || 'config.json');
const config = JSON.parse(fs.readFileSync(configPath));

export default () => config;
