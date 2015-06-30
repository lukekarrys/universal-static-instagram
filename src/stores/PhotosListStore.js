'use strict';

import alt from '../alt';
import photoActions from '../actions/PhotoActions';

class PhotosListStore {
  constructor () {
    this.bindAction(photoActions.updatePhotos, this.onUpdatePhotos);
    this.state = {};
  }

  onUpdatePhotos (obj) {
    this.setState(obj);
  }
}

export default alt.createStore(PhotosListStore, 'PhotosListStore');
