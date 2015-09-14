'use strict';

import 'babel/register';
import webpack from 'hjs-webpack';
import cssnano from 'cssnano';
import once from 'lodash/function/once';
import OnBuildPlugin from 'on-build-webpack';
import copyMedia from './server/data/copyMedia';

const isDev = (process.argv[1] || '').indexOf('webpack-dev-server') !== -1;
const config = webpack({
  isDev,
  in: 'src/main.js',
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: true},
  html: require('./server/build'),
  devServer: {noInfo: true},
  define: {__DEVTOOLS__: false}
});

// Destructuring to get stuff out of the config that we need to manipulate/use
const {module: {loaders}, postcss} = config;

// css-loader could come at the start or end so we use ^/$ in the regex,
// we cant just match css-loader because then that would match things like
// postcss-loader
const rCssLoader = /(^|!)(css-loader)($|!)/;

// Happy, debuggable selectors in dev. Super compact selectors in prod.
const cssIdentifier = `${isDev ? '[name]___[local]___' : ''}[hash:base64:5]`;
const cssModulesLoader = `?modules&localIdentName=${cssIdentifier}`;
const loaderReplacer = (r, n) => (l) => l.loader = l.loader.replace(r, n);

// Update any css-loader with the necessary loader params to do css module stuffs
loaders
.filter((l) => !!l.loader)
.filter((l) => !!l.loader.match(rCssLoader))
.forEach(loaderReplacer(rCssLoader, `$1$2${cssModulesLoader}$3`));

postcss.push(cssnano({
  // Required to work with relative Common JS style urls for css-modules
  // https://github.com/less/less.js/pull/2615
  normalizeUrl: false,
  // Core is on by default so disabling it for dev allows for more readable
  // css since it retains whitespace and bracket newlines
  core: !isDev,
  discardComments: {removeAll: !isDev}
}));

// Dont display assets because it will contain tons of html and json assets
// devServer.noInfo = true does the same thing for webpack-dev-server
config.stats = {assets: false};

// Copy all the media (only once) to the build/contentBase dir when webpack is
// has finished compiling. This means in dev mode that the server needs to be
// restarted if new images are fetched.
config.plugins.push(new OnBuildPlugin(once(copyMedia)));

export default config;
