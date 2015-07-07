'use strict';

import xhr from 'xhr';
import tryit from 'tryit';
import slash from './slash';

const api = (path, cb) => {
  setTimeout(() => xhr(`/json${slash(path)}.json`, (xhrErr, resp, body) => {
    if (xhrErr) return cb(xhrErr);
    let json;
    tryit(() => json = JSON.parse(body), (err) => cb(err, json));
  }), 1000);
};

const apiActions = (ctx, path) => {
  const {actions} = ctx;
  actions.load();
  api(path, (err, data) => {
    if (err) {
      actions.error(err);
    }
    else {
      actions.success(data);
    }
  });
};

export {api as api};
export default apiActions;
