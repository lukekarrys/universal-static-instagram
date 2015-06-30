'use strict';

import React from 'react';
import {Link} from 'react-router';
import permalink from '../../helpers/permalink';

const PhotoLink = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.element
    ]),
    created_time: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <Link to={permalink(this.props)}>{this.props.children}</Link>
    );
  }
});

export default PhotoLink;
