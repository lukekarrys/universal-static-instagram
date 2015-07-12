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

config.plugins.push(new OnBuildPlugin(copyMedia));

module.exports = config;
