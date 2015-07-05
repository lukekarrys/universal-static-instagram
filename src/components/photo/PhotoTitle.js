'use strict';

import React, {PropTypes} from 'react';

const PhotoTitle = React.createClass({
  propTypes: {
    caption: PropTypes.object
  },

  render () {
    const {caption} = this.props;
    return (
      <span>{caption ? caption.text : 'Untitled Photo'}</span>
    );
  }
});

export default PhotoTitle;
