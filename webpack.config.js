'use strict';

require('babel/register');

module.exports = require('hjs-webpack')({
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: require('./server/buildStatic')
});
