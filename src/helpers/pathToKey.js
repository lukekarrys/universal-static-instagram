'use strict';

import slash from './slash';

const pathToKey = (path) => slash(!path || path === '/' ? 'pages/1' : path);

export default pathToKey;
