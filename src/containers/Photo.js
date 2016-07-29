'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import PageContainer from './PageContainer';
import PhotoDetail from '../components/photo/PhotoDetail';
import {loadPhoto} from '../actions';
import mapKeyToProps from '../helpers/mapKeyToProps';

@connect(mapKeyToProps('photo'), {loadData: loadPhoto})
export default class Photo extends Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
    previous: PropTypes.string,
    next: PropTypes.string
  };

  render() {
    const {photo, previous, next, ...rest} = this.props;
    const component = <PhotoDetail {...{photo, previous, next}} />;
    return (
      <PageContainer component={component} {...rest} />
    );
  }
}
