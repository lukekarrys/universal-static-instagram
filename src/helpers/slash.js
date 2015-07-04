'use strict';

// Leading slash, no trailing slash
const slash = (path) => {
  const prefix = path.charAt(0) === '/' ? '' : '/';
  const main = path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
  return prefix + main;
};

export default slash;
