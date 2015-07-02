'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Photos from './Photos';

const PhotosByTag = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired
  },

  render () {
    return (
      <Photos {...this.props}>
        <ul>
          <li><Link to='/tags'>Other tags</Link></li>
        </ul>
      </Photos>
    );
  }
});

export default PhotosByTag;
