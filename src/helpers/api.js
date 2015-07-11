'use strict';

import xhr from 'xhr';
import tryit from 'tryit';
import slash from './slash';

const api = (path, cb) => {
  xhr(`/json${slash(path)}.json`, (xhrErr, resp, body) => {
    if (xhrErr) return cb(xhrErr);
    let json;
    tryit(() => json = JSON.parse(body), (err) => cb(err, json));
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
