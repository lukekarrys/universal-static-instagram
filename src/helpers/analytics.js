/* global __GA__ */

const noop = () => void 0;
let gapageview = null;

if (process.env.NODE_ENV === 'production' && __GA__) {
  const ga = require('react-ga');
  ga.initialize(__GA__);
  gapageview = ({pathname, search}) => ga.pageview(pathname + search);
}

export const pageview = (l) => (gapageview || noop)(l);
