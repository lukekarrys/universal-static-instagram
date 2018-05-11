/* eslint-disable import/unambiguous */

'use strict';

require('babel-register');

const path = require('path');
const fs = require('fs');
const webpack = require('hjs-webpack');
const _ = require('lodash');
const OnBuildPlugin = require('on-build-webpack');

const copyMedia = require('./server/data/copyMedia');
const {'default': serverBuild, buildDir} = require('./server/build');

const {env: {NODE_ENV = 'development', USI_LOGGER}} = process;
const isDev = NODE_ENV === 'development';

const config = webpack({
  isDev,
  'in': 'src/main.js',
  out: buildDir,
  clearBeforeBuild: true,
  output: {hash: true},
  html: serverBuild,
  define: {
    __LOGGER__: JSON.stringify(USI_LOGGER === 'true' || isDev)
  }
});

// Having hmre present in the .babelrc will break the babel-register above
// so we wait until that is done and then add it here via the loader query
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')));
config.module.rules[0].use = [
  {
    loader: 'babel-loader',
    options: _.merge(babelrc, {
      env: {
        development: {
          presets: ['react-hmre']
        }
      }
    })
  }
];

// Dont display assets because it will contain tons of html and json assets
// devServer.noInfo = true does the same thing for webpack-dev-server
config.stats = {assets: false};

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(_.once(copyMedia)));

module.exports = config;
