'use strict';

import React, {Component, PropTypes} from 'react';
import Link from '../InternalLink';
import slash from '../../helpers/slash';

export default class PhotoLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string,
    disabled: PropTypes.bool
  }

  render () {
    const {children, path, disabled} = this.props;
    return (
      <Link to={`/photos${slash(path)}`} disabled={disabled}>{children}</Link>
    );
  }
}
