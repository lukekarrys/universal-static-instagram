'use strict';

require('babel/register');

module.exports = require('hjs-webpack')({
  in: 'src/main.js',
  out: '_site',
  clearBeforeBuild: true,
  html: require('./server/buildFiles')
});
