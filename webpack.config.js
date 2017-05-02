'use strict';

require('babel-register');

const {env} = process;
const nodeEnv = env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

// Setup css modules require hook so it works when building for the server
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;
require('css-modules-require-hook')({generateScopedName: cssModulesNames});

const path = require('path');
const fs = require('fs');
const webpack = require('hjs-webpack');
const _ = require('lodash');
const OnBuildPlugin = require('on-build-webpack');

const userConfig = require('./server/config/get')();
const copyMedia = require('./server/data/copyMedia');
const {'default': serverBuild, buildDir} = require('./server/build');

const config = webpack({
  isDev,
  'in': 'src/main.js',
  out: buildDir,
  clearBeforeBuild: true,
  output: {hash: true},
  html: serverBuild,
  define: {
    __GA__: JSON.stringify(userConfig.ga || ''),
    __LOGGER__: JSON.stringify(env.USI_LOGGER === 'true' || isDev),
    __DEVTOOLS__: JSON.stringify(env.USI_DEVTOOLS === 'true')
  }
});

// Having hmre present in the .babelrc will break the babel-register above
// so we wait until that is done and then add it here via the loader query
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')));
config.module.rules[0].use = [{
  loader: 'babel-loader',
  options: _.merge(babelrc, {
    env: {
      development: {
        presets: ['react-hmre']
      }
    }
  })
}];

// Add support for css modules for files ending in '.module.css' and make other
// css loaders ignore those files
config.module.rules.forEach((rule, index, rules) => {
  if (rule && rule.use && rule.use.includes('css-loader')) {
    const cssIndex = rule.use.findIndex((loader) => loader === 'css-loader');

    // Update current css-loader to not look for modules and to minimize
    rule.test = new RegExp(`[^module]${rule.test.source}`);
    rule.use[cssIndex] = {
      loader: 'css-loader',
      options: {
        minimize: isDev ? false : {discardComments: {removeAll: true}}
      }
    };

    // Add new css-loader for modules
    rules.push({
      test: /\.module\.css$/,
      use: [
        ...rule.use.slice(0, cssIndex),
        {
          loader: 'css-loader',
          options: _.assign({}, rule.use[cssIndex].options, {
            modules: true,
            localIdentName: cssModulesNames
          })
        },
        ...rule.use.slice(cssIndex + 1)
      ]
    });
  }
});

// Hacky but we want to use the version of basscss that rebass uses
// without installing it. The css from rebass needs cssnext which I couldnt
// get to build properly with postcss options so instead this points basscss
// imports to where it should be after installing with npm3
config.resolve.alias = {
  basscss: path.resolve(__dirname, path.join('node_modules', 'basscss'))
};

// Dont display assets because it will contain tons of html and json assets
// devServer.noInfo = true does the same thing for webpack-dev-server
config.stats = {assets: false};

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(_.once(copyMedia)));

module.exports = config;
