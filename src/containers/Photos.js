'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageContainer from './PageContainer';
import PhotosBy from '../components/photos/PhotosBy';
import {loadPhotos} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('photos'), {loadPhotos})
export default class Photos extends Component {
  static propTypes = {
    fetchKey: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    photos: PropTypes.array.isRequired,
    loadPhotos: PropTypes.func.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string
  }

  render () {
    const {loading, error, photos, previous, next, name, type, fetchKey} = this.props;
    const loadData = this.props.loadPhotos;
    return (
      <PageContainer
        component={PhotosBy}
        data={{photos}}
        {...{error, loading, previous, next, name, type, loadData, fetchKey}}
      />
    );
  }
}
