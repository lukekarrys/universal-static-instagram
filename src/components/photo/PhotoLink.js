'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import permalink from '../../helpers/permalink';

const PhotoLink = React.createClass({
  propTypes: {
    created_time: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
  },

  render () {
    return (
      <Link to={permalink(this.props)}>{this.props.children}</Link>
    );
  }
});

export default PhotoLink;
