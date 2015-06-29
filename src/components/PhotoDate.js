'use strict';

import React from 'react';

const PhotoDate = React.createClass({
  propTypes: {
    created_time: React.PropTypes.string.isRequired
  },

  render () {
    return (
      <span>{new Date(Number(this.props.created_time) * 1000).toJSON()}</span>
    );
  }
});

export default PhotoDate;
