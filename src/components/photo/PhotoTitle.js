'use strict';

import React, {Component, PropTypes} from 'react';

export default class PhotoTitle extends Component {
  static propTypes = {
    caption: PropTypes.object
  }

  render() {
    const {caption} = this.props;
    return (
      <span>{caption ? caption.text : 'Untitled Photo'}</span>
    );
  }
}
