'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import PagesList from '../components/page/PagesList';
import PagesStore from '../stores/PagesStore';
import PagesActions from '../actions/PagesActions';

export default class Pages extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  static getStores = () => [PagesStore]

  componentDidMount () {
    PagesActions.fetch(this.props.location.pathname);
  }

  render () {
    const {pages, loading, error} = this.props;
    return (
      <div>
        <h1>Pages</h1>
        <PageContainer
          loading={loading}
          error={error}
          component={PagesList}
          data={{pages}}
        />
      </div>
    );
  }
}
