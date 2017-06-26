'use strict';

// https://gist.github.com/mathewbyrne/1280286
export default (str) => str
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '')
  .toLowerCase();
