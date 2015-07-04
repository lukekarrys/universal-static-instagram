'use strict';

import alt from '../alt';
import defaults from 'lodash/object/defaults';
import appActions from '../actions/AppActions';

const defaultValues = {
  photo: {},
  photos: [],
  tags: [],
  pages: []
};

class AppStore {
  constructor () {
    this.bindActions(appActions);
    this.on('bootstrap', () => defaults(this, defaultValues));
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
