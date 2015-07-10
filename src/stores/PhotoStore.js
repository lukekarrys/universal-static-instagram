'use strict';

import alt from '../alt';
import actions from '../actions/PhotoActions';

class PhotoStore {
  constructor () {
    this.photo = {};
    this.loading = false;
    this.error = null;
    this.bindActions(actions);
  }
  onSuccess (resp) {
    this.setState({photo: resp.photo, loading: false, error: null});
  }
  onFetch () {
    this.setState({photo: {}, loading: true, error: null});
  }
  onError (err) {
    this.setState({photo: {}, loading: false, error: err});
  }
}

export default alt.createStore(PhotoStore, 'PhotoStore');
