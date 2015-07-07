'use strict';

import React, {PropTypes} from 'react';
import Loading from '../components/Loading';
import PhotosBy from '../components/photos/PhotosBy';

const Photos = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  },

  statics: {
    getStoreName () {
      return 'Photos';
    }
  },

  render () {
    const {store, params} = this.props;
    const {photos, loading} = store;
    return (
      loading ? <Loading /> : <PhotosBy {...params} photos={photos} type='thumbnail' />
    );
  }
});

export default Photos;
