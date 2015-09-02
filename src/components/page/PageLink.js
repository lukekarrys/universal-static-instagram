'use strict';

import React, {Component, PropTypes} from 'react';
import Link from '../InternalLink';
import slash from '../../helpers/slash';

export default class PageLink extends Component {
  static propTypes = {
    page: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  }

  render () {
    const {page, children, disabled} = this.props;
    return (
      <Link to={`/pages${slash(page)}`} disabled={disabled}>{children}</Link>
    );
  }
}
