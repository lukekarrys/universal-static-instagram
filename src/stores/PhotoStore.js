'use strict';

import alt from '../alt';
import photoActions from '../actions/PhotoActions';

class PhotoStore {
  constructor () {
    this.bindAction(photoActions.updatePhoto, this.onUpdatePhoto);
    this.state = {};
  }

  onUpdatePhoto (obj) {
    this.setState(obj);
  }
}

export default alt.createStore(PhotoStore, 'PhotoStore');
