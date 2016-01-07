'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageContainer from './PageContainer';
import PhotosBy from '../components/photos/PhotosBy';
import {loadPhotos} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('photos'), {loadData: loadPhotos})
export default class Photos extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string
  };

  render() {
    const {photos, previous, next, name, type, ...rest} = this.props;
    const component = <PhotosBy {...{photos, previous, next, name, type}}/>;
    return (
      <PageContainer component={component} {...rest} />
    );
  }
}
