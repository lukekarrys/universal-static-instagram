'use strict';

import React, {Component, PropTypes} from 'react';
import Link from '../InternalLink';
import slash from '../../helpers/slash';

export default class PhotoLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string
  };

  render() {
    const {children, path, ...rest} = this.props;
    return (
      <Link to={`/photos${slash(path)}`} {...rest}>{children}</Link>
    );
  }
}
