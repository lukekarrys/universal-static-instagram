'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class PageError extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.instanceOf(Error),
      PropTypes.string
    ])
  };

  getErrorMessage() {
    const {error} = this.props;
    if (typeof error === 'string') return error;
    return error.stack ||
      (error.toString && error.toString()) ||
      error.message ||
      'There was an error';
  }

  render() {
    return (
      <pre>{this.getErrorMessage()}</pre>
    );
  }
}
