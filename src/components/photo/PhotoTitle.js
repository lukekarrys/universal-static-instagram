'use strict';

import React, {PropTypes} from 'react';

const PhotoTitle = React.createClass({
  propTypes: {
    caption: PropTypes.object
  },

  render () {
    return (
      <span>{this.props.caption ? this.props.caption.text : 'Untitled Photo'}</span>
    );
  }
});

export default PhotoTitle;
