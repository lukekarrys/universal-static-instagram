'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

export default class InternalLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool
  };

  render() {
    const {disabled, children, className, ...rest} = this.props;

    if (disabled) {
      return (
        <a style={{cursor: 'default'}} className={`${className} is-disabled`} {...rest}>{children}</a>
      );
    }

    return (
      <Link className={className} {...rest}>{children}</Link>
    );
  }
}
