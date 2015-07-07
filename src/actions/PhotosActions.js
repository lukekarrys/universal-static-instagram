'use strict';

import alt from '../alt';
import api from '../helpers/api';

class PhotosActions {
  constructor () {
    this.generateActions('load', 'error', 'success');
  }

  fetch (path) {
    api(this, path === '/' ? '/pages/1' : path);
  }
}

export default alt.createActions(PhotosActions);
