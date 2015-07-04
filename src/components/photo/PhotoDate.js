'use strict';

import React, {PropTypes} from 'react';
import moment from 'moment';
import createdDate from '../../helpers/createdDate';

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

  render () {
    const date = createdDate(this.props.created_time);
    return (
      date ? <span>{moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</span> : null
    );
  }
});

export default PhotoDate;
