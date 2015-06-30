'use strict';

import alt from '../alt';

class PhotoActions {
  constructor () {
    this.generateActions('updatePhoto');
  }
}

export default alt.createActions(PhotoActions, 'PhotoActions');
