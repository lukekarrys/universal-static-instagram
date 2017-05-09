'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class InternalLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    to: PropTypes.string,
    is: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func
    ])
  }

  render() {
    const {disabled, children, to, is, ...rest} = this.props;
    const LinkComponent = is || Link;
    const DisabledComponent = is || 'a';

    if (disabled) {
      return (
        <DisabledComponent
          {...rest}
          children={children}
          style={{...(rest.style || {}), cursor: 'default', opacity: 0.4}}
        />
      );
    }

    return (
      <LinkComponent
        {...rest}
        children={children}
        to={to}
        is={LinkComponent === Link ? null : Link}
      />
    );
  }
}
