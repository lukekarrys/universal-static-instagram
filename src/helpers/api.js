'use strict';

import xhr from 'xhr';
import attempt from 'lodash/utility/attempt';
import isError from 'lodash/lang/isError';
import slash from './slash';
import normalize from './normalize';

const fetchAPI = ({endpoint, key}, cb) => {
  xhr({
    uri: `/json${slash(endpoint)}.json`
  }, (__, resp, body) => {
    if (resp.statusCode !== 200) {
      return cb(new Error(body.message));
    }

    const json = attempt(() => JSON.parse(body));

    if (isError(json)) {
      return cb(json);
    }

    cb(null, normalize({json, key}));
  });
};

export default (store) => (next) => (action) => {
  if (!action.endpoint) return next(action);

  const {endpoint, types, key} = action;
  const [requestType, successType, failureType] = types;
  const actionWith = (data) => next({key: endpoint, ...data});

  actionWith({type: requestType});

  return fetchAPI({endpoint, key}, (error, response) => {
    if (error) {
      actionWith({type: failureType, error});
    }
    else {
      actionWith({type: successType, ...response});
    }
  });
};
