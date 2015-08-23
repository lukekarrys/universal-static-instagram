'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import slash from '../../helpers/slash';

export default class PageLink extends Component {
  static propTypes = {
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node
  }

  render () {
    const {page, children} = this.props;
    const pageStr = typeof page === 'number' ? String(page) : (page || '');
    const path = pageStr ? slash(pageStr) : '';
    const text = children || pageStr;
    return (
      <Link to={`/pages${path}`}>{text}</Link>
    );
  }
}
