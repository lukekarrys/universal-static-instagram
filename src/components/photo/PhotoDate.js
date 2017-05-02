'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import createdDate from '../../helpers/createdDate';

export default class PhotoDate extends Component {
  static propTypes = {
    createdTime: PropTypes.string.isRequired,
    dateFormat: PropTypes.string
  }

  static defaultProps = {
    dateFormat: 'dddd, mmmm dS yyyy, h:MM:ss tt'
  }

  render() {
    return (
      <span>{dateFormat(createdDate(this.props.createdTime), this.props.dateFormat)}</span>
    );
  }
}
