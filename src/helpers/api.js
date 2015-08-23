'use strict';

import xhr from 'xhr';
import attempt from 'lodash/utility/attempt';
import isError from 'lodash/lang/isError';
import slash from './slash';

const api = (path, cb) => {
  xhr(`/json${slash(path)}.json`, (xhrErr, resp, body) => {
    if (xhrErr) return cb(xhrErr);
    const result = attempt(() => JSON.parse(body));
    cb(isError(result) ? result : null, result);
  });
};

const apiActions = (ctx, path) => {
  if (typeof window === 'undefined') return;
  const {actions} = ctx;
  ctx.dispatch();
  api(path, (err, data) => {
    if (err) {
      actions.error(err);
    }
    else {
      actions.success(data);
    }
  });
};

export default apiActions;
