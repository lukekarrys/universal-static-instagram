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
  };

  render() {
    const {disabled, children, to, is, ...rest} = this.props;
    const LinkComponent = is || Link;
    const DisabledComponent = is || 'a';

    if (disabled) {
      // TODO: disabled ButtonOutlines should not have hover or active styles
      return (
        <DisabledComponent
          {...rest}
          children={children}
          style={{...(rest.style || {}), cursor: 'default', opacity: 0.4}}
        />
      );
    }

    return (
      // TODO: links should have non-default colors
      <LinkComponent
        {...rest}
        children={children}
        to={to}
        is={LinkComponent === Link ? null : Link}
      />
    );
  }
}
