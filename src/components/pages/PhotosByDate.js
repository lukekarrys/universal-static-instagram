'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Photos from './Photos';

const PhotosByDate = React.createClass({
  propTypes: {
    params: PropTypes.object.isRequired
  },

  render () {
    const {year, month, day} = this.props.params;
    return (
      <Photos {...this.props}>
        <ul>
          {day || month ? <li><Link to={`/photos/${year}`}>year</Link></li> : null}
          {day ? <li><Link to={`/photos/${year}/${month}`}>month</Link></li> : null}
        </ul>
      </Photos>
    );
  }
});

export default PhotosByDate;
