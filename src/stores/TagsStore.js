'use strict';

import alt from '../alt';
import actions from '../actions/TagsActions';

class TagsStore {
  constructor () {
    this.tags = [];
    this.loading = false;
    this.error = null;
    this.bindActions(actions);
  }
  onSuccess (resp) {
    this.setState({tags: resp.tags, loading: false, error: null});
  }
  onFetch () {
    this.setState({tags: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({tags: [], loading: false, error: err});
  }
}

export default alt.createStore(TagsStore, 'TagsStore');
