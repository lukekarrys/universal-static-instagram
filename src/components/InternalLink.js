'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {ButtonOutline} from 'rebass';
import {omit} from 'lodash';

export default class InternalLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  }

  render() {
    const {disabled, children, ...rest} = this.props;

    if (disabled) {
      return (
        <ButtonOutline style={{cursor: 'default'}} {...omit(rest, 'to')}>{children}</ButtonOutline>
      );
    }

    return (
      <ButtonOutline
        {...rest}
        is={Link}
        children={children}
      />
    );
  }
}
