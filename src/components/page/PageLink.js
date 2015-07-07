'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import slash from '../../helpers/slash';

const PageLink = React.createClass({
  propTypes: {
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node
  },

  render () {
    const {page, children} = this.props;
    const pageStr = typeof page === 'number' ? String(page) : (page || '');
    const path = pageStr ? slash(pageStr) : '';
    const text = children || pageStr;
    return (
      <Link to={`/pages${path}`}>{text}</Link>
    );
  }
});

export default PageLink;
