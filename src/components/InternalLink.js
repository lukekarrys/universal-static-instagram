'use strict';

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class InternalLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  }

  render () {
    const {disabled, children, ...rest} = this.props;

    if (disabled) {
      return (
        <a className='disabled' disabled='disabled' {...rest}>{children}</a>
      );
    }

    return (
      <Link {...rest}>{children}</Link>
    );
  }
}
