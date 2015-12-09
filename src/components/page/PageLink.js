'use strict';

import React, {Component, PropTypes} from 'react';
import Link from '../InternalLink';
import slash from '../../helpers/slash';

export default class PageLink extends Component {
  static propTypes = {
    page: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  render() {
    const {page, children, ...rest} = this.props;
    return (
      <Link to={`/pages${slash(page)}`} {...rest}>{children}</Link>
    );
  }
}
