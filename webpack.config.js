'use strict';

require('babel-register');

const path = require('path');
const fs = require('fs');
const webpack = require('hjs-webpack');
const cssnano = require('cssnano');
const _ = require('lodash');
const OnBuildPlugin = require('on-build-webpack');
const copyMedia = require('./server/data/copyMedia');
const server = require('./server/build');

const serverBuild = server.default;
const buildDir = server.buildDir;

const isDev = (process.argv[1] || '').indexOf('hjs-dev-server') !== -1;
const env = process.env;

const config = webpack({
  isDev,
  'in': 'src/main.js',
  out: buildDir,
  clearBeforeBuild: true,
  output: {hash: true},
  html: serverBuild,
  define: {
    __LOGGER__: JSON.stringify(env.USI_LOGGER === 'true' || isDev),
    __DEVTOOLS__: JSON.stringify(env.USI_DEVTOOLS === 'true')
  }
});

// Having hmre present in the .babelrc will break the babel-register above
// so we wait until that is done and then add it here via the loader query
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'));
config.module.loaders[0].query = _.extend(babelrc, {
  env: {
    development: {
      presets: ['react-hmre']
    }
  }
});

// Hacky but we want to use the version of basscss that rebass uses
// without installing it. The css from rebass needs cssnext which I couldnt
// get to build properly with postcss options so instead this points basscss
// imports to whichever path exists (one for npm2 and one for npm3).
// This is way to clever but at least it works.
config.resolve.alias = {
  basscss: ['basscss', 'rebass/node_modules/basscss']
  .map((p) => path.resolve(__dirname, path.join('.', 'node_modules', p)))
  .find((p) => _.chain(fs.statSync).attempt(p).invoke('isDirectory').value())
};

// Dont display assets because it will contain tons of html and json assets
// devServer.noInfo = true does the same thing for webpack-dev-server
config.stats = {assets: false};

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(_.once(copyMedia)));

// Add custom cssnano for css-modules to existing postcss plugin
config.postcss.push(cssnano({
  // Core is on by default so disabling it for dev allows for more readable
  // css since it retains whitespace and bracket newlines
  core: !isDev,
  discardComments: {removeAll: !isDev}
}));

module.exports = config;
