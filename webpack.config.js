/* eslint no-var:0 */

'use strict';

require('babel/register');

var OnBuildPlugin = require('on-build-webpack');
var copyMedia = require('./server/copyMedia');

var config = require('hjs-webpack')({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: require('./server/buildStatic')
});

// Copy all the media to the prod dir when webpack is done
config.plugins.push(new OnBuildPlugin(copyMedia));

// Dont display assets when building for production since it will
// contain tons of html and json assets
config.stats = {assets: config.spec.isDev};

module.exports = config;
