'use strict';

import alt from '../alt';
import defaults from 'lodash/object/defaults';
import actions from '../actions/PagesActions';

const defaultValues = {
  pages: [],
  loading: false,
  error: null
};

class PagesStore {
  constructor () {
    this.bindActions(actions);
    this.on('bootstrap', () => this.setState(defaults(this, defaultValues)));
  }
  onSuccess (resp) {
    this.setState({pages: resp.pages, loading: false, error: null});
  }
  onLoad () {
    this.setState({pages: [], loading: true, error: null});
  }
  onError (err) {
    this.setState({pages: [], loading: false, error: err});
  }
}

export default alt.createStore(PagesStore, 'PagesStore');
