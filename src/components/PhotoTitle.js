'use strict';

import React from 'react';

const PhotoTitle = React.createClass({
  propTypes: {
    caption: React.PropTypes.object
  },

  render () {
    return (
      <span>{this.props.caption ? this.props.caption.text : 'Untitled Photo'}</span>
    );
  }
});

export default PhotoTitle;
