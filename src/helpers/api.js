'use strict';

import xhr from 'xhr';
import {attempt, isError} from 'lodash';
import slash from './slash';
import normalize from './normalize';

const SUCCESS_CODE = 200;
const fetchAPI = ({endpoint, key}, cb) => {
  xhr({
    uri: `/json${slash(endpoint)}.json`
  }, (__, resp, body) => {
    if (resp.statusCode !== SUCCESS_CODE) {
      return cb(new Error(body.message));
    }

    const json = attempt(() => JSON.parse(body));

    if (isError(json)) {
      return cb(json);
    }

    return cb(null, normalize({json, key}));
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
