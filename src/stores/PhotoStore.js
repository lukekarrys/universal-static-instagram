'use strict';

import alt from '../alt';
import defaults from 'lodash/object/defaults';
import actions from '../actions/PhotoActions';

const defaultValues = {
  photo: {},
  loading: false,
  error: null
};

class PhotoStore {
  constructor () {
    this.bindActions(actions);
    this.on('bootstrap', () => this.setState(defaults(this, defaultValues)));
  }
  onSuccess (resp) {
    this.setState({photo: resp.photo, loading: false, error: null});
  }
  onLoad () {
    this.setState({photo: {}, loading: true, error: null});
  }
  onError (err) {
    this.setState({photo: {}, loading: false, error: err});
  }
}

export default alt.createStore(PhotoStore, 'PhotoStore');
