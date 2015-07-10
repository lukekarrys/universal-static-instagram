'use strict';

import alt from '../alt';
import actions from '../actions/PagesActions';

class PagesStore {
  constructor () {
    this.pages = [];
    this.loading = false;
    this.error = null;
    this.bindActions(actions);
  }
  onSuccess (resp) {
    this.setState({pages: resp.pages, loading: false, error: null});
  }
  onFetch () {
    this.setState({pages: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({pages: [], loading: false, error: err});
  }
}

export default alt.createStore(PagesStore, 'PagesStore');
