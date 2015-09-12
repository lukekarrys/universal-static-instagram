'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import TagsList from '../components/tag/TagsList';
import {connect} from 'react-redux';
import {loadTags} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('tags'), {loadTags})
export default class Tags extends Component {
  static propTypes = {
    fetchKey: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    tags: PropTypes.array.isRequired,
    loadTags: PropTypes.func.isRequired
  }

  render () {
    const {tags, loading, error, fetchKey} = this.props;
    const loadData = this.props.loadTags;
    return (
      <div>
        <h1>Tags</h1>
        <PageContainer
          component={TagsList}
          data={{tags}}
          {...{error, loading, loadData, fetchKey}}
        />
      </div>
    );
  }
}
