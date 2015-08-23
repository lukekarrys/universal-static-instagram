'use strict';

import React, {Component, PropTypes} from 'react';
import PageContainer from '../components/PageContainer';
import PhotoDetail from '../components/photo/PhotoDetail';
import PhotoStore from '../stores/PhotoStore';
import PhotoActions from '../actions/PhotoActions';

export default class Photo extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    photo: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    error: PropTypes.instanceOf(Error)
  }

  static getStores = () => {
    return [PhotoStore];
  }

  componentDidMount () {
    PhotoActions.fetch(this.props.location.pathname);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      PhotoActions.fetch(nextProps.location.pathname);
    }
  }

  render () {
    const {photo, loading, error} = this.props;
    return (
      <PageContainer
        loading={loading}
        error={error}
        component={PhotoDetail}
        data={{photo}}
      />
    );
  }
}
