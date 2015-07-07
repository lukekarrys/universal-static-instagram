'use strict';

import React, {PropTypes} from 'react';
import Loading from '../components/Loading';
import PagesList from '../components/page/PagesList';

const Pages = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  },

  statics: {
    getStoreName () {
      return 'Pages';
    }
  },

  render () {
    const {pages, loading} = this.props.store;
    return (
      <div>
        <h1>Pages</h1>
        {loading ? <Loading /> : <PagesList pages={pages} />}
      </div>
    );
  }
});

export default Pages;
