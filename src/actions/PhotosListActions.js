'use strict';

import alt from '../alt';

class PhotosListActions {
  constructor () {
    this.generateActions('updatePhotos');
  }
}

export default alt.createActions(PhotosListActions, 'PhotosListActions');
