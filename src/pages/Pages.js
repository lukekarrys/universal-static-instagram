'use strict';

import React, {PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import PagesList from '../components/page/PagesList';
import PagesStore from '../stores/PagesStore';
import PagesActions from '../actions/PagesActions';

const Pages = React.createClass({
  propTypes: {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error)
  },

  statics: {
    getStores () {
      return [PagesStore];
    }
  },

  componentDidMount () {
    PagesActions.fetch(this.props.location.pathname);
  },

  render () {
    const {pages, loading, error} = this.props;
    return (
      <div>
        <h1>Pages</h1>
        <PageContainer loading={loading} error={error} component={PagesList} pages={pages} />
      </div>
    );
  }
});

export default Pages;
