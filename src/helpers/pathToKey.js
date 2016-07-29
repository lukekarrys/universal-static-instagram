'use strict';

import slash from './slash';

export default (path) =>
  slash(!path || path === '/' ? 'pages/1' : path)
    .replace(/\.html$/, '');
