'use strict';

import alt from '../alt';
import defaults from 'lodash/object/defaults';
import actions from '../actions/PhotosActions';

const defaultValues = {
  photos: [],
  loading: false,
  error: null
};

class PhotosStore {
  constructor () {
    this.bindActions(actions);
    this.on('bootstrap', () => this.setState(defaults(this, defaultValues)));
  }
  onSuccess (resp) {
    this.setState({photos: resp.photos, loading: false, error: null});
  }
  onLoad () {
    this.setState({photos: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({photos: [], loading: false, error: err});
  }
}

export default alt.createStore(PhotosStore, 'PhotosStore');
