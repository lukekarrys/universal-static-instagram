'use strict';

import alt from '../alt';
import defaults from 'lodash/object/defaults';
import actions from '../actions/TagsActions';

const defaultValues = {
  tags: [],
  loading: false,
  error: null
};

class TagsStore {
  constructor () {
    this.bindActions(actions);
    this.on('bootstrap', () => this.setState(defaults(this, defaultValues)));
  }
  onSuccess (resp) {
    this.setState({tags: resp.tags, loading: false, error: null});
  }
  onLoad () {
    this.setState({tags: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({tags: [], loading: false, error: err});
  }
}

export default alt.createStore(TagsStore, 'TagsStore');
