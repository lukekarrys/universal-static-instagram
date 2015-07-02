'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Photos from './Photos';

const PhotosByPage = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired
  },

  render () {
    let {page} = this.props.params;
    if (!page) page = 1;
    return (
      <Photos {...this.props}>
        <ul>
          <li><Link to={`/pages/${Number(page) - 1}`}>Prev</Link></li>
          <li><Link to={`/pages/${Number(page) + 1}`}>Next</Link></li>
          <li><Link to='/pages'>All pages</Link></li>
        </ul>
      </Photos>
    );
  }
});

export default PhotosByPage;
