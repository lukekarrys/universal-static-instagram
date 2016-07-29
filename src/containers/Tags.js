'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageContainer from './PageContainer';
import TagsList from '../components/tag/TagsList';
import {loadTags} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('tags'), {loadData: loadTags})
export default class Tags extends Component {
  static propTypes = {
    tags: PropTypes.array.isRequired
  };

  render() {
    const {tags, ...rest} = this.props;
    const component = <TagsList tags={tags} />;
    return (
      <PageContainer component={component} {...rest} />
    );
  }
}
