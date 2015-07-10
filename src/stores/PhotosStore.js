'use strict';

import alt from '../alt';
import actions from '../actions/PhotosActions';

class PhotosStore {
  constructor () {
    this.photos = [];
    this.loading = false;
    this.error = null;
    this.bindActions(actions);
  }
  onSuccess (resp) {
    this.setState({photos: resp.photos, loading: false, error: null});
  }
  onFetch () {
    this.setState({photos: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({photos: [], loading: false, error: err});
  }
}

export default alt.createStore(PhotosStore, 'PhotosStore');
