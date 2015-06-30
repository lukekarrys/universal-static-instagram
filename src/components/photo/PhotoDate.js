'use strict';

import React from 'react';
import dateformat from 'dateformat';

const PhotoDate = React.createClass({
  propTypes: {
    created_time: React.PropTypes.string.isRequired,
    dateFormat: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT'
    };
  },

  render () {
    const date = new Date(Number(this.props.created_time) * 1000);
    return (
      <span>{dateformat(date, this.props.dateFormat)}</span>
    );
  }
});

export default PhotoDate;
