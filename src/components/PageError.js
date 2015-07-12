'use strict';

import React, {PropTypes, Component} from 'react';

class PageError extends Component {
  static propTypes = {
    error: PropTypes.oneOfType([
      PropTypes.instanceOf(Error),
      PropTypes.string
    ])
  }

  getErrorMessage () {
    const {error} = this.props;
    return error ?
      (typeof error === 'string' ? error : error.message) :
      'There was an error';
  }

  render () {
    return (
      <span>{this.getErrorMessage()}</span>
    );
  }
}

export default PageError;
