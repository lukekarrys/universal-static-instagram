/* eslint no-var:0 */

'use strict';

require('babel/register');

var webpack = require('hjs-webpack');
var once = require('lodash/function/once');
var OnBuildPlugin = require('on-build-webpack');
var copyMedia = require('./server/data/copyMedia');

var config = webpack({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: require('./server/build')
});

// Dont display assets because it will contain tons of html and json assets
config.stats = {assets: false}; // webpack
if (config.devServer) config.devServer.noInfo = true; // webpack-dev-server

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(once(copyMedia)));

module.exports = config;
