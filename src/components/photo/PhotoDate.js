'use strict';

import React, {PropTypes} from 'react';
import moment from 'moment';
import createdDate from '../../helpers/createdDate';

const PhotoDate = React.createClass({
  propTypes: {
    created_time: PropTypes.string.isRequired,
    dateFormat: PropTypes.string
  },

  getDefaultProps () {
    return {
      dateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a'
    };
  },

  render () {
    const date = createdDate(this.props.created_time);
    return (
      <span>{moment(date).format(this.props.dateFormat)}</span>
    );
  }
});

export default PhotoDate;
