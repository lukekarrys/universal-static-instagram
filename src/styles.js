'use strict';

import {injectGlobal} from 'styled-components';

export default () => injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`;
