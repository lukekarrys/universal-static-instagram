'use strict';

import React, {PropTypes} from 'react';
import moment from 'moment';

const PhotoDate = React.createClass({
  propTypes: {
    created_time: PropTypes.string,
    dateFormat: PropTypes.string
  },

  getDefaultProps () {
    return {
      dateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a'
    };
  },

  getDate () {
    const {created_time: time} = this.props;
    return time ? new Date(Number(time) * 1000) : null;
  },

  render () {
    const date = this.getDate();
    return (
      date ? <span>{moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span> : null
    );
  }
});

export default PhotoDate;
