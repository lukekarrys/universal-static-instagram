'use strict';

import xhr from 'xhr';
import alt from '../alt';

const api = (path, cb) => {
  xhr(`/json${path.charAt(0) === '/' ? '' : '/'}${path}.json`, (err, resp, body) => {
    if (err) {
      cb(err);
    }
    else {
      let json;
      try {
        json = JSON.parse(body);
      }
      catch (e) {
        return cb(e);
      }
      cb(null, json);
    }
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

class AppActions {
  constructor () {
    this.generateActions(
      'photoReceive',
      'photoError',
      'photosReceive',
      'photosError',
      'tagsReceive',
      'tagsError',
      'pagesReceive',
      'pagesError'
    );
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
