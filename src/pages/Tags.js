'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import TagsList from '../components/tag/TagsList';
import TagsStore from '../stores/TagsStore';
import TagsActions from '../actions/TagsActions';

export default class Tags extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  static getStores = () => [TagsStore]

  componentDidMount () {
    TagsActions.fetch(this.props.location.pathname);
  }

  render () {
    const {tags, loading, error} = this.props;
    return (
      <div>
        <h1>Tags</h1>
        <PageContainer
          loading={loading}
          error={error}
          component={TagsList}
          data={{tags}}
        />
      </div>
    );
  }
}
