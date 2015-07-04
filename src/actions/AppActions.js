'use strict';

import xhr from 'xhr';
import tryit from 'tryit';
import flatten from 'lodash/array/flatten';
import alt from '../alt';
import slash from '../helpers/slash';

const api = (path, cb) => {
  xhr(`/json${slash(path)}.json`, (xhrErr, resp, body) => {
    if (xhrErr) return cb(xhrErr);
    let json;
    tryit(() => json = JSON.parse(body), (err) => cb(err, json));
  });
};

const fetchHelper = (ctx, path, action) => {
  api(path, (err, photo) => {
    if (err) {
      ctx.actions[action + 'Error'](err);
    }
    else {
      ctx.actions[action + 'Receive'](photo);
    }
  });
};

const actionTypes = (a) => [`${a}Receive`, `${a}Error`];

class AppActions {
  constructor () {
    const actions = flatten(['photo', 'photos', 'tags', 'pages'].map(actionTypes));
    this.generateActions.apply(this, actions);
  }

  fetchPhoto (path) {
    fetchHelper(this, path, 'photo');
  }

  fetchPhotos (path) {
    fetchHelper(this, path, 'photos');
  }

  fetchTags () {
    fetchHelper(this, 'tags', 'tags');
  }

  fetchPages () {
    fetchHelper(this, 'pages', 'pages');
  }
}

export default alt.createActions(AppActions);
