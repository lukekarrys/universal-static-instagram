'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import PhotoDetail from '../components/photo/PhotoDetail';
import {connect} from 'react-redux';
import {loadPhoto} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('photo'), {loadPhoto})
export default class Photo extends Component {
  static propTypes = {
    fetchKey: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
    photo: PropTypes.object.isRequired,
    loadPhoto: PropTypes.func.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string
  }

  render () {
    const {photo, loading, error, previous, next, fetchKey} = this.props;
    const loadData = this.props.loadPhoto;
    return (
      <PageContainer
        component={PhotoDetail}
        data={{photo}}
        {...{loading, error, previous, next, loadData, fetchKey}}
      />
    );
  }
}
