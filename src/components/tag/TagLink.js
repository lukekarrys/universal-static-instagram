'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import slash from '../../helpers/slash';

const TagLink = React.createClass({
  propTypes: {
    tag: PropTypes.string,
    children: PropTypes.node
  },

  render () {
    const {tag, children} = this.props;
    const path = tag ? slash(tag) : '';
    const text = children || tag;
    return (
      <Link to={`/tags${path}`}>{text}</Link>
    );
  }
});

export default TagLink;
