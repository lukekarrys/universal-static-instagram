'use strict';

import 'babel-core/register';
import webpack from 'hjs-webpack';
import cssnano from 'cssnano';
import once from 'lodash/function/once';
import OnBuildPlugin from 'on-build-webpack';
import copyMedia from './server/data/copyMedia';
import serverBuild from './server/build';

const isDev = (process.argv[1] || '').indexOf('webpack-dev-server') !== -1;

const config = webpack({
  isDev,
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: serverBuild,
  devServer: {noInfo: true},
  define: {__DEVTOOLS__: false}
});

// Dont display assets because it will contain tons of html and json assets
// devServer.noInfo = true does the same thing for webpack-dev-server
config.stats = {assets: false};

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(once(copyMedia)));

// Add custom cssnano for css-modules to existing postcss plugin
config.postcss.push(cssnano({
  // Required to work with relative Common JS style urls for css-modules
  // https://github.com/less/less.js/pull/2615
  normalizeUrl: false,
  // Core is on by default so disabling it for dev allows for more readable
  // css since it retains whitespace and bracket newlines
  core: !isDev,
  discardComments: {removeAll: !isDev}
}));

export default config;
