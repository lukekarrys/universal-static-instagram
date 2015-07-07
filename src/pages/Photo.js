'use strict';

import React, {PropTypes} from 'react';
import Loading from '../components/Loading';
import PhotoDetail from '../components/photo/PhotoDetail';

const Photo = React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  },

  statics: {
    getStoreName () {
      return 'Photo';
    }
  },

  render () {
    const {photo, loading} = this.props.store;
    return (
      loading ? <Loading /> : <PhotoDetail {...photo} />
    );
  }
});

export default Photo;
