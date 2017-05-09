/* global __GA__ */

let gapageview = null;

if (process.env.NODE_ENV === 'production' && __GA__) {
  const ga = require('react-ga');
  ga.initialize(__GA__);
  gapageview = ga.pageview;
}

// eslint-disable-next-line no-console
export const pageview = ({pathname, search}) => (gapageview || console.log)(pathname + search);
