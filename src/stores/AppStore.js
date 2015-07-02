'use strict';

import alt from '../alt';
import appActions from '../actions/AppActions';

class AppStore {
  constructor () {
    this.bindActions(appActions);
    this.photo = {};
    this.photos = [];
    this.tags = [];
    this.pages = [];
  }

  onPhotoReceive (resp) {
    this.photo = resp.photo;
  }

  onPhotosReceive (resp) {
    this.photos = resp.photos;
  }

  onTagsReceive (resp) {
    this.tags = resp.tags;
  }

  onPagesReceive (resp) {
    this.pages = resp.pages;
  }
}

export default alt.createStore(AppStore, 'AppStore');
