'use strict';

import React, {PropTypes} from 'react';

const PageError = React.createClass({
  propTypes: {
    error: PropTypes.oneOfType([
      PropTypes.instanceOf(Error),
      PropTypes.string
    ])
  },

  getErrorMessage () {
    const {error} = this.props;
    return error ?
      (typeof error === 'string' ? error : error.message) :
      'There was an error';
  },

  render () {
    return (
      <span>{this.getErrorMessage()}</span>
    );
  }
});

export default PageError;
